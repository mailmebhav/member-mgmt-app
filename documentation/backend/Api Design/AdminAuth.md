### API'S

#### AdminAuth

- `GET` /api/adminauth

  - Response
    - HTTP Status `200`
    ```json
    {
      "status": "OK",
      "errorMessage": "",
      "data": [
        {
          "userName": "16aefdb4e6feedb53469c0210c8deecc650e822550f743c409e00b9a4fea1393",
          "password": "089542505d659cecbb988bb5ccff5bccf85be2dfa8c221359079aee2531298bb",
          "token": "5fbc4cc6dbdad18094cdb50d9ec0c034a6aef15c06c03aa0fb7b5fddfc744878",
          "expires": "2024-05-20T10:05:38.215Z"
        }
      ]
    }
    ```

- `POST` /api/adminauth

  - Request Body
    ```json
    {
      "userName": "Admin3",
      "password": "newpassword"
    }
    ```
  - Response
    - HTTP Status `201`
    ```json
    {
      "status": "OK",
      "errorMessage": "",
      "data": {
          "userName": "16aefdb4e6feedb53469c0210c8deecc650e822550f743c409e00b9a4fea1393",
          "password": "089542505d659cecbb988bb5ccff5bccf85be2dfa8c221359079aee2531298bb",
          "token": "e54fe0e701eb4e2a25bb7c0ae64105d5f8b269074f4a305ea468d5443b1d2173",
          "expires": "2024-05-26T08:38:23.275Z"
      }
    }
    ```

- `POST` /api/adminauth/validate

  - Request Body
    ```json
    {
      "userName": "Admin3",
      "password": "updatedPassword"
    }
    ```
  - Response
    - HTTP Status `200`
    ```json
    {
      "status": "OK",
      "errorMessage": "",
      "data": {
          "validUser": true,
          "token": "f3ca1d529e15763f249aee907a6ea5b9b95a32dd7f78973ec2ffacf21e860578"
      }
    }
    ```

- `PUT` /api/adminauth
  - Request Body
    ```json
    {
      "userName": "Admin3",
      "oldPassword": "newpassword",
      "newPassword": "updatedPassword"
    }
    ```
  - Response
    - HTTP Status `200`
    ```json
    {
      "status": "OK",
      "errorMessage": "",
      "data": {
          "userName": "16aefdb4e6feedb53469c0210c8deecc650e822550f743c409e00b9a4fea1393",
          "password": "a853eb9056f559430f61147acdd07c0a94630b93ac5baae39c64bb91034a46a6",
          "token": "2d54ad13cdedd2dbd9d7cff23b0b70d64b9d8fca17fd47faae7fa8560ade4668",
          "expires": "2024-05-26T09:36:36.229Z"
      }
    }
    ```

- `DELETE` /api/adminauth
  - Request Body
    ```json
    {
      "userName": "Admin2",
      "password": "newpassword"
    }
    ```
  - Response
    - HTTP Status `200`
    ```json
    {
      "status": "OK",
      "errorMessage": "",
      "data": "Admin2 deleted successfully"
    }
    ```