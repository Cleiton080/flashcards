
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface DeckInput {
    name: string;
    learning_step_again?: Nullable<number>;
    learning_step_good?: Nullable<number>;
    graduating_interval?: Nullable<number>;
    easy_interval?: Nullable<number>;
    interval_modifier?: Nullable<number>;
    easy_bonus?: Nullable<number>;
    language_id: string;
}

export interface LanguageInput {
    name: string;
}

export interface Card {
    id: string;
    type?: Nullable<string>;
    front?: Nullable<string>;
    back?: Nullable<string>;
    created_at?: Nullable<string>;
    updated_at?: Nullable<string>;
}

export interface IQuery {
    cards(): Nullable<Nullable<Card>[]> | Promise<Nullable<Nullable<Card>[]>>;
    decks(): Nullable<Nullable<Deck>[]> | Promise<Nullable<Nullable<Deck>[]>>;
    languages(): Nullable<Nullable<Language>[]> | Promise<Nullable<Nullable<Language>[]>>;
    language(id: string): Nullable<Language> | Promise<Nullable<Language>>;
}

export interface Deck {
    id: string;
    name: string;
    learning_step_again?: Nullable<number>;
    learning_step_good?: Nullable<number>;
    graduating_interval?: Nullable<number>;
    easy_interval?: Nullable<number>;
    interval_modifier?: Nullable<number>;
    easy_bonus?: Nullable<number>;
    language_id: string;
    created_at?: Nullable<string>;
    updated_at?: Nullable<string>;
}

export interface IMutation {
    createDeck(input: DeckInput): Nullable<Deck> | Promise<Nullable<Deck>>;
    createLanguage(input: LanguageInput): Nullable<Language> | Promise<Nullable<Language>>;
    updateLanguage(id: string, input: LanguageInput): Nullable<Language> | Promise<Nullable<Language>>;
    removeLanguage(id: string): Nullable<Language> | Promise<Nullable<Language>>;
}

export interface Language {
    id: string;
    name?: Nullable<string>;
    created_at?: Nullable<string>;
    updated_at?: Nullable<string>;
}

type Nullable<T> = T | null;
