
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CardInput {
    type?: Nullable<string>;
    front: string;
    back: string;
    deck_id: string;
}

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
    deck?: Nullable<Deck>;
    created_at?: Nullable<string>;
    updated_at?: Nullable<string>;
}

export interface IQuery {
    cards(): Nullable<Nullable<Card>[]> | Promise<Nullable<Nullable<Card>[]>>;
    card(id: string): Nullable<Card> | Promise<Nullable<Card>>;
    decks(): Nullable<Deck>[] | Promise<Nullable<Deck>[]>;
    deck(id: string): Deck | Promise<Deck>;
    languages(): Nullable<Nullable<Language>[]> | Promise<Nullable<Nullable<Language>[]>>;
    language(id: string): Nullable<Language> | Promise<Nullable<Language>>;
}

export interface IMutation {
    createCard(input?: Nullable<CardInput>): Nullable<Card> | Promise<Nullable<Card>>;
    updateCard(id: string, input?: Nullable<CardInput>): Nullable<Card> | Promise<Nullable<Card>>;
    removeCard(id: string): Nullable<Card> | Promise<Nullable<Card>>;
    createDeck(input: DeckInput): Nullable<Deck> | Promise<Nullable<Deck>>;
    updateDeck(id: string, input: DeckInput): Nullable<Deck> | Promise<Nullable<Deck>>;
    removeDeck(id: string): Nullable<Deck> | Promise<Nullable<Deck>>;
    createLanguage(input: LanguageInput): Nullable<Language> | Promise<Nullable<Language>>;
    updateLanguage(id: string, input: LanguageInput): Nullable<Language> | Promise<Nullable<Language>>;
    removeLanguage(id: string): Nullable<Language> | Promise<Nullable<Language>>;
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
    language?: Nullable<Language>;
    cards?: Nullable<Nullable<Card>[]>;
    created_at?: Nullable<string>;
    updated_at?: Nullable<string>;
}

export interface Language {
    id: string;
    name?: Nullable<string>;
    created_at?: Nullable<string>;
    updated_at?: Nullable<string>;
}

type Nullable<T> = T | null;
