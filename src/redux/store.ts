import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import { v4 as uuidv4 } from "uuid";

// Define the type for a Note
interface Note {
  id: string; // Unique identifier for each note
  title: string;
  body: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

// Define the state type
type NotesState = Note[];

// Initial state
const initialState: NotesState = [];

// Slice for notes
const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (
      state,
      action: PayloadAction<{ title: string; body: string }>
    ) => {
      const { title, body } = action.payload;
      const formatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      const timestamp = formatter.format(new Date());
      const id = uuidv4(); 
      state.push({ id, title, body, createdAt: timestamp, updatedAt: timestamp });
    },
    updateNote: (
      state,
      action: PayloadAction<{ id: string; title: string; body: string }>
    ) => {
      const { id, title, body = "" } = action.payload;
      const note = state.find((note) => note.id === id);
      if (note) {
        note.title = title;
        note.body = body;
        note.updatedAt = new Date().toISOString();
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      return state.filter((note) => note.id !== id);
    },
    deleteAllNotes: (state) => {
      return []; 
    },
  },
});

export const { addNote, updateNote, deleteNote, deleteAllNotes } = notesSlice.actions;

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  notes: notesSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these redux-persist action types
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/FLUSH",
          "persist/REGISTER",
        ],
      },
    }),
});

// Type definitions for the store and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
