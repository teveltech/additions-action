const diff = require("diff")
const core = require('@actions/core');

const old_str = core.getInput("old");
const new_str = core.getInput("new");

const additions = diff.diffTrimmedLines(old_str, new_str).filter((change) => change.added).map((change) => change.value.trim());

core.setOutput("additions", additions);