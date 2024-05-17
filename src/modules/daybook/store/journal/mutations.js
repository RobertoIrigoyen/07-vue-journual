export const setEntries = (state, entries) => {
  state.entries = [...state.entries, ...entries];
  state.isLoading = false;
};
export const updateEntry = (state, entry) => {
  const indx = state.entries.map((e) => e.id).indexOf(entry.id);
  state.entries[indx] = entry;
};
export const addEntry = (/* state */) => {};
