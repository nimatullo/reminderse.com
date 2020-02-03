# Reminderse API


## User Model

| Endpoints                  | Endpoint URL         | HTTP Method |
|----------------------------|----------------------|-------------|
| Get Current User           | /api/current+user    | GET         |
| Log In                     | /api/login           | PUT         |
| Register                   | /api/register        | POST        |
| Logout                     | /api/logout          | PUT         |
| Change Account Information | /api/change          | PUT         |
| Change Password            | /api/change+password | PUT         |
| Unsubscribe                | /api/unsubscribe     | DELETE      |

## Entries Model

| Endpoints           | Endpoint URL               | HTTP Method |
|---------------------|----------------------------|-------------|
| Add Link            | /api/link/add              | POST        |
| Add Text            | /api/text/add              | POST        |
| Get Links (all)     | /api/link/list             | GET         |
| Get Texts (all)     | /api/text/list             | GET         |
| Edit Link           | /api/link/edit/            | PUT         |
| Edit Text           | /api/text/edit/            | PUT         |
| Get Link (specific) | /api/link/view/<link_id>   | GET         |
| Get Text (specific) | /api/text/view/<text_id>   | GET         |
| Delete Link         | /api/link/delete/<link_id> | DELETE      |
| Delete Text         | /api/text/delete/<text_id> | DELETE      |
| Search              | /api/search/<query>        | GET         |
