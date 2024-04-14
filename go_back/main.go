package main

import (
    "database/sql"
    "encoding/json"
    "fmt"
    "log"
    "net/http"

    _ "github.com/go-sql-driver/mysql"
)


type Users struct {
    User_id  int    // Add more fields as needed
    User_name string
    Phone    string
    Gmail    string
    Password string
}

type RegisterRequest struct {
    User_name string `json:"user_name"`
    Phone     string `json:"phone"`
    Gmail     string `json:"gmail"`
    Password  string `json:"password"`
}

type LoginRequest struct {
    Gmail    string `json:"gmail"`
    Password string `json:"password"`
}

var db *sql.DB

func main() {
    var err error
    db, err = sql.Open("mysql", "root:Omboo716$@tcp(localhost:3306)/test")
    if err != nil {
        log.Fatal("Error connecting to the database:", err)
    }
    defer db.Close()

    // Ping the database to verify the connection
    if err := db.Ping(); err != nil {
        log.Fatal("Error pinging the database:", err)
    }

    fmt.Println("Connected to the database")

    // Create a new router
    router := http.NewServeMux()

    // Register handlers with the router
    router.HandleFunc("/register", RegisterHandler)
    router.HandleFunc("/login", LoginHandler)

    // Define a function to add CORS headers
    addCORSHeaders := func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            // Allow requests from specific origin (replace '*' with the origin of your frontend application)
            w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
            w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
            w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

            // If it's a preflight request, respond with a 200 status code
            if r.Method == http.MethodOptions {
                w.WriteHeader(http.StatusOK)
                return
            }

            // Continue with the next handler
            next.ServeHTTP(w, r)
        })
    }

    // Wrap the router with the CORS middleware
    handler := addCORSHeaders(router)

    // Start the server
    fmt.Println("Starting server on :8080...")
    if err := http.ListenAndServe(":8080", handler); err != nil {
        log.Fatal("Error starting server:", err)
    }
}



func RegisterHandler(w http.ResponseWriter, r *http.Request) {
    // Parse JSON request body
    var req RegisterRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, "Error parsing JSON data", http.StatusBadRequest)
        return
    }

    // Validate request fields
    if req.Phone == "" || req.User_name == "" || req.Gmail == "" || req.Password == "" {
        http.Error(w, "All fields are required", http.StatusBadRequest)
        return
    }

    // Perform registration logic
    _, err := db.Exec("INSERT INTO users (phone, user_name, gmail, password) VALUES (?, ?, ?, ?)",
        req.Phone, req.User_name, req.Gmail, req.Password)
    if err != nil {
        // Log the error for debugging
        log.Printf("Error inserting user data into database: %v", err)
        // Return a generic error message to the client
        http.Error(w, "Error inserting user data into database", http.StatusInternalServerError)
        return
    }

    fmt.Fprintf(w, "Registration successful")
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
    // Parse JSON request body
    var req LoginRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, "Error parsing JSON data", http.StatusBadRequest)
        return
    }

    // Validate request fields
    if req.Gmail == "" || req.Password == "" {
        http.Error(w, "Gmail and password are required", http.StatusBadRequest)
        return
    }

    // Perform login logic
    var user Users
    err := db.QueryRow("SELECT * FROM users WHERE gmail = ? AND password = ?", req.Gmail, req.Password).Scan(
        &user.User_id, &user.User_name, &user.Phone, &user.Gmail, &user.Password)
    if err != nil {
        if err == sql.ErrNoRows {
            http.Error(w, "User not found or invalid credentials", http.StatusUnauthorized)
            return
        }
        http.Error(w, "Error querying user data from database", http.StatusInternalServerError)
        return
    }

    fmt.Fprintf(w, "Login successful")
}
