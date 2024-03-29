
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface AuthInput {
    email: string;
    password: string;
}

export interface CardInput {
    type?: Nullable<string>;
    front: string;
    back: string;
    deck_id: string;
}

export interface LanguageDeck {
    id: string;
}

export interface DeckInput {
    name: string;
    learning_step_again?: Nullable<number>;
    learning_step_good?: Nullable<number>;
    graduating_interval?: Nullable<number>;
    easy_interval?: Nullable<number>;
    interval_modifier?: Nullable<number>;
    easy_bonus?: Nullable<number>;
    languages: LanguageDeck[];
}

export interface LanguageInput {
    name: string;
}

export interface ReviewInput {
    cardId: string;
    cardAnswearId: string;
    delayResponse: string;
}

export interface Auth {
    access_token: string;
    expires_in: number;
    refresh_expires_in: number;
    refresh_token: string;
    token_type: string;
    session_state: string;
    scope: string;
}

export interface IMutation {
    login(input: AuthInput): Nullable<Auth> | Promise<Nullable<Auth>>;
    createCard(input?: Nullable<CardInput>): Nullable<Card> | Promise<Nullable<Card>>;
    updateCard(id: string, input?: Nullable<CardInput>): Nullable<Card> | Promise<Nullable<Card>>;
    removeCard(id: string): Nullable<Card> | Promise<Nullable<Card>>;
    createDeck(input: DeckInput): Nullable<Deck> | Promise<Nullable<Deck>>;
    updateDeck(id: string, input: DeckInput): Nullable<Deck> | Promise<Nullable<Deck>>;
    removeDeck(id: string): Nullable<Deck> | Promise<Nullable<Deck>>;
    createLanguage(input: LanguageInput): Nullable<Language> | Promise<Nullable<Language>>;
    updateLanguage(id: string, input: LanguageInput): Nullable<Language> | Promise<Nullable<Language>>;
    removeLanguage(id: string): Nullable<Language> | Promise<Nullable<Language>>;
    createReview(input: ReviewInput): Nullable<Review> | Promise<Nullable<Review>>;
}

export interface Card {
    id: string;
    type?: Nullable<string>;
    front?: Nullable<string>;
    back?: Nullable<string>;
    due?: Nullable<string>;
    ease?: Nullable<number>;
    deck?: Nullable<Deck>;
    created_at?: Nullable<string>;
    updated_at?: Nullable<string>;
}

export interface ReviewCard {
    total: number;
    cards: Nullable<Card>[];
}

export interface IQuery {
    cards(): Nullable<Nullable<Card>[]> | Promise<Nullable<Nullable<Card>[]>>;
    card(id: string): Nullable<Card> | Promise<Nullable<Card>>;
    reviewCards(deckId: string): Nullable<ReviewCard> | Promise<Nullable<ReviewCard>>;
    decks(): Nullable<Deck>[] | Promise<Nullable<Deck>[]>;
    deck(id: string): Deck | Promise<Deck>;
    languages(): Nullable<Nullable<Language>[]> | Promise<Nullable<Nullable<Language>[]>>;
    language(id: string): Nullable<Language> | Promise<Nullable<Language>>;
    reviews(): Nullable<Review[]> | Promise<Nullable<Review[]>>;
    review(id: string): Nullable<Review> | Promise<Nullable<Review>>;
    whoami(): User | Promise<User>;
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
    languages: Nullable<Language>[];
    cards?: Nullable<Nullable<Card>[]>;
    created_at?: Nullable<string>;
    updated_at?: Nullable<string>;
}

export interface Language {
    id: string;
    name?: Nullable<string>;
    decks: Nullable<Deck>[];
    created_at?: Nullable<string>;
    updated_at?: Nullable<string>;
}

export interface Review {
    id: string;
    delay_response: string;
    card: Card;
    created_at?: Nullable<string>;
    updated_at?: Nullable<string>;
}

export interface User {
    id: string;
    email?: Nullable<string>;
    email_constraint?: Nullable<string>;
    email_verified: boolean;
    enabled: boolean;
    federation_link?: Nullable<string>;
    first_name?: Nullable<string>;
    last_name?: Nullable<string>;
    realm_id?: Nullable<string>;
    username?: Nullable<string>;
    created_timestamp?: Nullable<number>;
    service_account_client_link?: Nullable<string>;
    not_before?: Nullable<number>;
}

type Nullable<T> = T | null;
