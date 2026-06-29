export function reviewPrompt(prd, tasks, diff) {
    return `Code review the following diff against PRD and tasks. Output JSON: [{path, severity: "BLOCKING"|"NON_BLOCKING", comment}]. PRD: ${prd} Tasks: ${tasks} Diff: ${diff}`;
}
