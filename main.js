const diff = require("diff")
const core = require('@actions/core');

const old_str = core.getInput("old");
const new_str = core.getInput("new");

const additions = diff.diffTrimmedLines(old_str, new_str).filter((change) => change.added).map((change) => change.value.trim());
const deletions = diff.diffTrimmedLines(old_str, new_str).filter((change) => change.removed).map((change) => change.value.trim());

const additions_str = additions.toString().replace(/,/g, '\n');
const deletions_str = deletions.toString().replace(/,/g, '\n');

const additions_arr = additions_str.split(/\n/g);
const deletions_arr = deletions_str.split(/\n/g);

let changes_str = "";
for (let i = 0; i < (additions_arr.length > deletions_arr.length ? additions_arr.length : deletions_arr.length); i++) {
    changes_str += deletions_arr[i] + " -> " + additions_arr[i] + '\n';
}

core.setOutput("added", additions_str);
core.setOutput("removed", deletions_str);
core.setOutput("changed", changes_str);
