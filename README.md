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

**UWAGA! Do poprawnej pracy aplikacji potrzebny jest plik `.env`.**
**W celu uzyskania tego pliku skontaktuj się z jednym z autorów.**

Aby uruchomić aplikację lokalnie, wykonaj poniższe kroki:

1. Zainstaluj zależności backendu, frontendu oraz pomocnicze:
   ```bash
   npm run install-all
   ```
2. Umieść plik `.env` w katalogu [/backend](/backend)

3. Uruchom aplikację:
    ```bash
    npm run start
    ```

Należy również pamiętać, że niektóre przeglądarki mogą blokować poprawne działanie aplikacji przez politykę CORS (Cross-Origin Resource Sharing).

## 🛠 Wykorzystane technologie

### Narzędzia pomocnicze

- **concurrently** – umożliwia równoczesne uruchamianie backendu i frontendów, upraszczając zarządzanie projektem.

### Backend

Backend aplikacji został zbudowany w oparciu o **Node.js** i **Express** oraz korzysta z **MongoDB** jako bazy danych.


- **express** – framework do tworzenia aplikacji webowych w Node.js.
- **mongoose** – biblioteka do pracy z MongoDB, ułatwiająca operacje na bazie danych.
- **cookie-parser** – middleware do obsługi ciasteczek w zapytaniach HTTP.
- **cors** – obsługa CORS (Cross-Origin Resource Sharing), umożliwiająca komunikację między frontendem a backendem.
- **dotenv** – zarządzanie zmiennymi środowiskowymi za pomocą pliku `.env`.
- **jsonwebtoken** – obsługa autoryzacji i uwierzytelniania za pomocą tokenów JWT.
- **bcryptjs** – szyfrowanie haseł użytkowników przed zapisaniem w bazie danych.
- **validator** – walidacja danych wejściowych - poprawność adresów e-mail.

### Frontend

Frontend aplikacji został zbudowany w oparciu o **Vite** i **React**, z wykorzystaniem **React Bootstrap**. 

- **react-bootstrap** – komponenty React oparte na Bootstrapie, ułatwiające stylizację interfejsu.
- **bootstrap** – framework CSS zapewniający gotowe style i komponenty UI.
- **react-router-dom** – obsługa nawigacji i trasowania w aplikacji React.
- **@reduxjs/toolkit** – zestaw narzędzi ułatwiających zarządzanie stanem aplikacji w Redux.
- **react-redux** – integracja Redux z Reactem, umożliwiająca łatwy dostęp do globalnego stanu.
- **axios** – biblioteka do obsługi zapytań HTTP, wykorzystywana do komunikacji z backendem.
- **framer-motion** – biblioteka do animacji i efektów wizualnych w React.
- **prop-types** – narzędzie do sprawdzania typów właściwości komponentów React.

## ⚙ Funkcjonalności

### Autoryzacja
- Rejestracja, Logowanie, Wylogowanie z konta
- Sprawdzanie uprawnień


### Admin
- Dodawanie, Edytowanie, Usuwanie Produktów
- Możliwość wyświetlania i zmiany statusu wszystkich zamówień
- Możliwość wyświetlania i usunięcia każdej opinii

### Użytkownik
- Przeglądanie produktów w sklepie
- Wyszukiwanie produktu i filtrowanie po kategorii
- Sprawdzanie szczegółów produktu (wraz z dodanymi do niego opiniami)
- Dodanie, usunięcie opinii (po zakupie produktu)
- Dodanie, usunięcie produktu do koszyka
- Zmiana ilości produktu w koszyku
- Stworzenie zamówienia (po wprowadzeniu danych do wysyłki)
- "Opłacenie zamówienia"
- Przeglądanie złożonych zamówień

### System
- Sprawdzanie warunków integralnościowych wielu operacji (mamy nadzieję, że wszystkich)
- Dynamiczne aktualizowanie stanu magazynu i średniej oceny produktów