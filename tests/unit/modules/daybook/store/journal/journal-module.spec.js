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

jest.setTimeout(12000);
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

  // Actions

  test("actions: loadEntries", async () => {
    const store = createVuexStore({ isLoading: true, entries: [] });
    await store.dispatch("journal/loadEntries");

    expect(store.state.journal.entries.length).toBe(2);
  });

  test("actions: updateEntry", async () => {
    const store = createVuexStore(journalState);

    const updatedEntry = {
      id: "-MfKM3yA5ij3hnmLFfqv",
      date: 1627077227978,
      text: "Hola mundo desde mock data",
      otroCampo: true,
      otroMas: { a: 1 },
    };

    await store.dispatch("journal/updateEntry", updatedEntry);

    expect(store.state.journal.entries.length).toBe(2);
    expect(
      store.state.journal.entries.find((e) => e.id === updatedEntry.id)
    ).toEqual({
      id: "-MfKM3yA5ij3hnmLFfqv",
      date: 1627077227978,
      text: "Hola mundo desde mock data",
    });
  });

  test("actions: createEntry deleteEntry", async () => {
    const store = createVuexStore(journalState);

    const newEntry = {
      date: 1627077227978,
      text: "Nueva entrada desde las pruebas",
    };

    const id = await store.dispatch("journal/createEntry", newEntry);

    expect(typeof id).toBe("string");

    expect(store.state.journal.entries.find((e) => e.id === id)).toBeTruthy();

    await store.dispatch("journal/deleteEntry", id);

    expect(store.state.journal.entries.find((e) => e.id === id)).toBeFalsy();
  });
});
