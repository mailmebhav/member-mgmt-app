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
              "password": "a853eb9056f559430f61147acdd07c0a94630b93ac5baae39c64bb91034a46a6",
              "token": "e844d4f170da25c1801f68447c647c7e591ca93403304d1b36e541c0b0464f2b",
              "expires": "2024-05-26T15:38:50.115Z"
          },
          {
              "userName": "c1c224b03cd9bc7b6a86d77f5dace40191766c485cd55dc48caf9ac873335d6f",
              "password": "e86f78a8a3caf0b60d8e74e5942aa6d86dc150cd3c03338aef25b7d2d7e3acc7",
              "token": "8f6dc9f23927b6aaebd24304f2ec414c1f91538bb2c5cf9a4c316fecb57d487e",
              "expires": "2024-05-26T08:40:02.279Z"
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
      "password": "newpassword"
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
          "token": "b41fdc1516e6b5dd1fccc05f5273f6b8ae85691ac7113a0577a2053ea4c399e5"
      }
    }
    ```

- `PUT` /api/adminauth
  - Request Body
    ```json
    {
      "userName": "Admin3",
      "oldPassword": "updatedPassword",
      "newPassword": "newpassword"
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
          "password": "089542505d659cecbb988bb5ccff5bccf85be2dfa8c221359079aee2531298bb",
          "token": "7c738ba651ce7ca833cfcf21d31b84aa58e94b7a5d2714bedfef64228fb8e58a",
          "expires": "2024-05-27T08:41:09.530Z"
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