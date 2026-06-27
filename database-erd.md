# Database Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    USERS ||--o{ STUDENTS : "is a"
    USERS ||--o{ FACULTY : "is a"
    USERS {
        uuid id PK
        string email
        string password_hash
        string role "Admin, Student, Faculty, Staff"
        datetime created_at
        datetime updated_at
    }

    STUDENTS }|--|| DEPARTMENTS : belongs_to
    STUDENTS {
        uuid id PK
        uuid user_id FK
        string roll_number
        string first_name
        string last_name
        date dob
        uuid department_id FK
    }

    FACULTY }|--|| DEPARTMENTS : belongs_to
    FACULTY {
        uuid id PK
        uuid user_id FK
        string employee_id
        string first_name
        string last_name
        uuid department_id FK
    }

    DEPARTMENTS ||--o{ COURSES : offers
    DEPARTMENTS {
        uuid id PK
        string name
        string code
    }

    COURSES ||--o{ SUBJECTS : contains
    COURSES {
        uuid id PK
        string name
        string code
        uuid department_id FK
    }

    SUBJECTS {
        uuid id PK
        string name
        string code
        int credits
        uuid course_id FK
    }

    STUDENTS ||--o{ ATTENDANCE : has
    SUBJECTS ||--o{ ATTENDANCE : for
    ATTENDANCE {
        uuid id PK
        uuid student_id FK
        uuid subject_id FK
        date date
        boolean status
    }

    STUDENTS ||--o{ EXAMINATIONS : takes
    EXAMINATIONS ||--o{ RESULTS : generates
    EXAMINATIONS {
        uuid id PK
        string name
        date exam_date
        uuid subject_id FK
    }

    RESULTS {
        uuid id PK
        uuid student_id FK
        uuid exam_id FK
        float marks_obtained
        float max_marks
    }
```

*(This ERD illustrates a foundational subset of the core models. Additional models such as Fees, Library, Placements, Hostel, Transport, Alumni, and Notifications will follow a similar relationship structure linked to Users and core academic entities during Phase 3.)*
