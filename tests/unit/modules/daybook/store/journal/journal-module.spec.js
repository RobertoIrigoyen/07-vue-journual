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
    store.commit("journal/updateEntry", { updateEntry });

    expect(store.state.journal.entries.length).toBe(2);

    expect(
      store.state.journal.entries.find((e) => e.id === updateEntry.id)
    ).toEqual(updateEntry);
  });

  test("mutation: addEntry deleteEntry", () => {
    const store = createVuexStore(journalState);

    // Add Entry

    store.commit("journal/addEntry", {
      id: "ABC123",
      text: "Hola mundo desde mock data",
    });
    expect(store.state.journal.entries.length).toBe(3);
    expect(store.state.journal.entries.find((e) => e.id === "ABC123").id).toBe(
      "ABC123"
    );

    //Delete Entry

    store.commit("journal/deleteEntry", "ABC123");
    expect(store.state.journal.entries.length).toBe(2);
    expect(
      store.state.journal.entries.find((e) => e.id != "ABC123")
    ).toBeTruthy();
  });

  // Getters

  test("getters: getEntriesByTerm getEntryById", () => {
    const store = createVuexStore(journalState);
    const [entry1, entry2] = journalState.entries;

    expect(store.getters["journal/getEntriesByTerm"]("").length).toBe(2);
    expect(store.getters["journal/getEntriesByTerm"]("segunda").length).toBe(1);

    expect(store.getters["journal/getEntriesByTerm"]("segunda")).toEqual([
      entry2,
    ]);

    expect(
      store.getters["journal/getEntryById"]("-MfKM3yA5ij3hnmLFfqv")
    ).toEqual(entry1);
  });

  test("actions: loadEntries", () => {});

  test("actions: updateEntry", () => {});

  test("actions: createEntry deleteEntry", () => {});
});
