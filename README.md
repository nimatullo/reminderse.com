# Reminderse API

## User Model

| Endpoints               | Endpoint URL                 | HTTP Method |
| ----------------------- | ---------------------------- | ----------- |
| Get Current User        | /api/current+user            | GET         |
| Log In                  | /api/login                   | PUT         |
| Register                | /api/register                | POST        |
| Logout                  | /api/logout                  | PUT         |
| Change Username         | /api/change/username         | PUT         |
| Change Email            | /api/change/email            | PUT         |
| Change Password         | /api/change/password         | PUT         |
| Unsubscribe             | /api/unsubscribe             | DELETE      |
| Send Email Confirmation | /api/send-email-confirmation | GET         |
| Is Email Confirmed      | /api/confirmed               | GET         |

## Entries Model

| Endpoints                           | Endpoint URL              | HTTP Method |
| ----------------------------------- | ------------------------- | ----------- |
| Add Link                            | /api/link/add             | POST        |
| Add Text                            | /api/text/add             | POST        |
| Get Links (all)                     | /api/link/list            | GET         |
| Get Texts (all)                     | /api/text/list            | GET         |
| Edit Link                           | /api/link/<link_id>       | PUT         |
| Edit Text                           | /api/text/<text_id>       | PUT         |
| Get Link (specific)                 | /api/link/<link_id>       | GET         |
| Get Text (specific)                 | /api/text/<text_id>       | GET         |
| Delete Link                         | /api/link/<link_id>       | DELETE      |
| Delete Text                         | /api/text/<text_id>       | DELETE      |
| Pause Text                          | /api/text/<text_id>/pause | PUT         |
| Pause Link                          | /api/text/<link_id>/pause | PUT         |
| Search (No frontend implementation) | /api/search/<query>       | GET         |
