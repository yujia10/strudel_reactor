// Mute selected track
export function muteTrack(text, trackName) {
  const lines = text.split("\n");

  // update target track status
  const updatedLines = lines.map((line) => {
    if (line.trim().startsWith(`${trackName}:`)) {
      return line.replace(`${trackName}:`, `_${trackName}:`);
    }
    return line;
  });

  return updatedLines.join("\n");
}

// Adjust volume based on slider change
export function controlVolume(text, volume) {
  let outputText = text;
  let regex = /[a-zA-Z0-9_]+:\s*\n[\s\S]+?\r?\n(?=[a-zA-Z0-9_]*[:/])/gm;
  let matches = [];
  let m;

  while ((m = regex.exec(outputText)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    m.forEach((match, groupIndex) => {
      matches.push(match);
    });
  }

  let matches2 = matches.map((match) =>
    match.replaceAll(
      /(?<!post)gain\(([\d.]+)\)/g,
      (match, captureGroup) => `gain(${captureGroup}*${volume})`
    )
  );

  let replacedText = matches.reduce(
    (text, original, i) => text.replaceAll(original, matches2[i]),
    outputText
  );

  return replacedText;
}

export function controlSpeed(text, speed) {
  const regex = /setcps\(([\d./]+)\)/;
  // find matched text
  const match = text.match(regex);
  if (!match) return text;

  // get first number
  const expression = match[1];
  const parts = expression.split("/");

  // replace bpm value
  const baseBpm = parts[0];
  parts[0] = `${baseBpm} * ${speed}`;

  const newSetcps = `setcps(${parts.join("/")})`;

  return text.replace(regex, newSetcps);
}

export function controlLpf(text, trackName, value) {
  if (!value) return text;
  // Match track blocks
  let regex = /[a-zA-Z0-9_]+:\s*\n[\s\S]+?\r?\n(?=[a-zA-Z0-9_]*[:/])/gm;
  let matches = [];
  let m;

  while ((m = regex.exec(text)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    matches.push(m[0]);
  }
  // Find target track block
  const targetBlock = matches.find((block) =>
    block.trim().startsWith(`${trackName}:`)
  );

  if (!targetBlock || !targetBlock.includes(".lpf(")) return text;
  // Replace .lpf() in the block
  const updatedBlock = targetBlock.replace(
    /\.lpf\([\d.]+\)/g,
    `.lpf(${value})`
  );
  // Replace original block
  return text.replace(targetBlock, updatedBlock);
}

// Remove .jux(rev)
export function removeJuxRev(text) {
  return text.replace(/\.jux\(rev\)/g, "");
}

// Add or delete .degrade()
export function controlDegrade(
  text,
  degrade,
  targetTracks = ["bassline", "main_arp"]
) {
  if (!degrade) {
    return text.replace(/\.degrade\(\)/g, "");
  }

  // add .degrade() for specified tracks
  let outputText = text;
  let regex = /[a-zA-Z0-9_]+:\s*\n[\s\S]+?\r?\n(?=[a-zA-Z0-9_]*[:/])/gm;
  let matches = [];
  let m;

  while ((m = regex.exec(outputText)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    matches.push(m[0]);
  }

  let matches2 = matches.map((match) => {
    // Check target track
    const isTargetTrack = targetTracks.some((trackName) =>
      match.trim().startsWith(`${trackName}:`)
    );

    if (isTargetTrack && !match.includes(".degrade()")) {
      // Add .degrade() as last line
      return match.replace(/(\.[a-z]+\([^)]*\))(\s*)$/, "$1\n.degrade()$2");
    }
    return match;
  });

  let replacedText = matches.reduce(
    (text, original, i) => text.replace(original, matches2[i]),
    outputText
  );

  return replacedText;
}

// Preprocesses the source code
export function processText(source, tracks, volume, speed, lpf, jux, degrade) {
  let text = source;

  // search for track set to hush
  for (let trackName in tracks) {
    if (tracks[trackName] === "HUSH") {
      text = muteTrack(text, trackName);
    }
  }

  // Set global gain
  if (volume !== 1) {
    text = controlVolume(text, volume);
  }

  // Set global speed
  if (speed !== 1) {
    text = controlSpeed(text, speed);
  }

  // Set lpf
  for (let trackName in lpf) {
    text = controlLpf(text, trackName, lpf[trackName]);
  }

  // Control degrage effect
  text = controlDegrade(text, degrade);

  // Control jux(rev)
  if (!jux) {
    text = removeJuxRev(text);
  }

  return text;
}
