### Exercise
Create a diagram depicting the situation where the user goes to the single-page app version of the notes app at https://studies.cs.helsinki.fi/exampleapp/spa.

---

#### Solution
```mermaid
sequenceDiagram
    participant Browser
    participant Server

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate Server
    Server-->>Browser: HTML document
    deactivate Server

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate Server
    Server-->>Browser: the css file
    deactivate Server

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate Server
    Server-->>Browser: the JavaScript file
    deactivate Server

    Note right of Browser: The Browser starts executing the JavaScript code that fetches the JSON from the Server

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate Server
    Server-->>Browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate Server

    Note right of Browser: The Browser executes the callback function that renders the notes

    Note right of Browser: The user starts filling the form and submits the note "Test Note" on date 07 September 2024 at 14:23

    Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa, payload: {content: "Test Note", date: "2024-09-07T11:23:08.807Z"}
    activate Server
    Server-->Browser: 201 created, response: {"message":"note created"}
    deactivate Server

    Note right of Browser: The Browser updates the notes thanks to the spa.js file, without reloading the page
```
</br>

The notes are refreshed for **two reasons**:
1. The `e.preventDefault()` avoids the default behavior of submitting a form (which would invoke a GET request), making it possible to manually submit a POST request.
2. The spa.js file internally calls `redrawNotes()`.