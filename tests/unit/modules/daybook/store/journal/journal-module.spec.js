import { createStore } from "vuex";

import journalModule from "@/modules/daybook/store/journal";
import { journalState } from "../../../../mock-data/test-journal-state";

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journalModule,
        state: { ...initialState },
      },
    },
  });

describe("Vuex - Pruebas en el Journal Module", () => {
  test("este es el estado inicial, debe de tener este state", () => {
    const store = createVuexStore(journalState);

    const { isLoading, entries } = store.state.journal;

    expect(isLoading).toBeFalsy();

    expect(entries).toEqual(journalState.entries);
  });

  //Mutation
  test("mutation: setEntries", () => {
    const store = createVuexStore({ isLoading: true, entries: [] });

    store.commit("journal/setEntries", journalState.entries);

    expect(store.state.journal.entries.length).toBe(2);
    expect(store.state.journal.isLoading).toBeFalsy();
  });
  test("mutation: updateEntry", () => {
    const store = createVuexStore(journalState);

    const updateEntry = {
      id: "-MfKM3yA5ij3hnmLFfqv",
      date: 1627077227978,
      text: "Hola mundo desde mock data",
    };
    store.commit("journal/updateEntry", updateEntry);

    expect(store.state.journal.entries.length).toBe(2);

    expect(store.state.journal.entries.find((e) => e.id === updateEntry.id)).toEqual(updateEntry);
  });

  test("mutation: addEntry deleteEntry", () => {});

  test("getters: getEntriesByTerm getEntryById", () => {});

  test("actions: loadEntries", () => {});

  test("actions: updateEntry", () => {});

  test("actions: createEntry deleteEntry", () => {});
});
