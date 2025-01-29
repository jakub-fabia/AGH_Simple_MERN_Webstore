# Simple MERN Webstore Project

Projekt realizowany w ramach przedmiotu **Wstęp do Aplikacji Internetowych** na kierunku **Informatyka** na AGH w Krakowie.

## 📌 Autorzy

- **Jakub Fabia**
- **Michał Gontarz**

## 📖 Opis projektu

Projekt jest pełnoprawną aplikacją webową opartą na stosie **MERN** (**MongoDB, Express, React, Node.js**), umożliwiającą użytkownikom przeglądanie i zakup produktów.

## 📜 Treść polecenia

[**Treść zadania**](/Projekt.pdf)

## 🚀 Uruchomienie projektu

Aby uruchomić aplikację lokalnie, wykonaj poniższe kroki:

1. Zainstaluj zależności:
   ```bash
   npm i
   ```
2. Zainstaluj zależności zarówno dla backendu, jak i frontendów:
    ```bash
    npm run install-all
    ```
3. Uruchom aplikację:
    ```bash
    npm run start
    ```

## 🛠 Wykorzystane technologie

### 📌 Narzędzia pomocnicze

- **concurrently** – umożliwia równoczesne uruchamianie backendu i frontendów, upraszczając zarządzanie projektem.

### 🏗 Backend

Backend aplikacji został zbudowany w oparciu o **Node.js** i **Express** oraz korzysta z **MongoDB** jako bazy danych.


- **express** – framework do tworzenia aplikacji webowych w Node.js.
- **mongoose** – biblioteka do pracy z MongoDB, ułatwiająca operacje na bazie danych.
- **cookie-parser** – middleware do obsługi ciasteczek w zapytaniach HTTP.
- **cors** – obsługa CORS (Cross-Origin Resource Sharing), umożliwiająca komunikację między frontendem a backendem.
- **dotenv** – zarządzanie zmiennymi środowiskowymi za pomocą pliku `.env`.
- **jsonwebtoken** – obsługa autoryzacji i uwierzytelniania za pomocą tokenów JWT.
- **bcryptjs** – szyfrowanie haseł użytkowników przed zapisaniem w bazie danych.
- **validator** – walidacja danych wejściowych - poprawność adresów e-mail.

### 🎨 Frontend

