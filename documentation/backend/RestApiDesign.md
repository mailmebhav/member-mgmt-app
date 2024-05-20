## Rest Api Design

### Tables

- ADMIN_AUTH

  - USERNAME VARCHAR(200) NOT NULL PRIMARY KEY
  - PASSWORD VARCHAR(200) NOT NULL
  - TOKEN VARCHAR(300)
  - EXPIRES NUMBER NOT NULL

- MEMBER_DETAIL

  - MEMBER_ID NUMBER NOT NULL PRIMARY KEY (SEQUENCE)
  - FIRM_ID NUMBER NOT NULL REFERENCES FIRM_DETAIL(FIRM_ID)
  - KSMN_ID VARCHAR(20)
  - YSK_ID VARCHAR(20)
  - FAMILY_ID VARCHAR(20)
  - MEMBER_NAME VARCHAR(20) NOT NULL
  - FATHER_NAME VARCHAR(20) NOT NULL
  - NOKH VARCHAR(20) NOT NULL
  - DOB DATE NOT NULL
  - GENDER CHAR(1) NOT NULL
  - BLOOD GROUP VARCHAR(4)
  - CONTACT VARCHAR(10) NOT NULL
  - CONTACT2 VARCHAR(10)
  - KUTCH_NATIVE VARCHAR(20)

- FIRM_DETAIL

  - FIRM_ID NUMBER NOT NULL PRIMARY KEY(SEQUENCE)
  - FIRM_NAME VARCHAR(40) NOT NULL
  - AREA VARCHAR(30)
  - PINCODE VARCHAR(6)

- PAYMENT_DETAIL
  - PAYMENT_ID NUMBER NOT NULL PRIMARY KEY(SEQUENCE)
  - PAYMENT_MODE VARCHAR(30)
  - PAYMENT_FOR VARCHAR(50)
  - AMOUNT DOUBLE
  - TRANSACTION_ID VARCHAR(50)
  - RECEIPT_NUMBER VARCHAR(30)

### Token to be expired after every 4 hours

### Validate token on each call.If invalid redirect to login page.

### API'S

<!-- - POST /auth/login
    - Request Body

    `{"username": "<hashed_username>","password": "<hashed_password>"}`

    - Response

    `200` : `{"status": "OK", "errorMessage": null, "data" : {"token" : "<hashed_token>"}}`

    `401` : `{"status": "UNAUTHORIZED", "errorMessage": "User Name or Password is mismatched.", "data" : null}`

- DELETE /auth/logout/{hashed_token}

    `200` : `{"status": "OK", "errorMessage": null, "data" : "Token deleted successfully."}` -->

- `GET` /api/adminauth

  - Response
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
    ```json
    {
      "status": "OK",
      "errorMessage": "",
      "data": {
        "userName": "16aefdb4e6feedb53469c0210c8deecc650e822550f743c409e00b9a4fea1393",
        "password": "089542505d659cecbb988bb5ccff5bccf85be2dfa8c221359079aee2531298bb",
        "token": "5fbc4cc6dbdad18094cdb50d9ec0c034a6aef15c06c03aa0fb7b5fddfc744878",
        "expires": "2024-05-20T10:05:38.215Z"
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
    ```json
    {
      "status": "OK",
      "errorMessage": "",
      "data": {
        "validUser": true,
        "token": "07117745cf0cc94d2199e6f9f2f53d093004fe4e218e05f8233f2e38922ebf3b"
      }
    }
    ```

- `GET` /api/firm

  - Response
    ```json
    {
      "status": "OK",
      "errorMessage": "",
      "data": [
        {
          "paymentId": 1,
          "paymentMode": "Cash",
          "paymentFor": "Chitthi",
          "amount": 20000.5,
          "transactionId": "15",
          "receiptNumber": "45"
        }
      ]
    }
    ```

- `POST` /api/firm

  - Request Body

    ```json
    {
      "firmName": "Narayan Saw Mill",
      "area": "Yelahanka",
      "pincode": 560090
    }
    ```

  - Response
    ```json
    {
      "status": "OK",
      "errorMessage": "",
      "data": {
        "firmId": 3,
        "firmName": "Narayan Saw Mill",
        "area": "Yelahanka",
        "pincode": 560090
      }
    }
    ```

- `GET` /api/member

  - Response
    ```json
    {
      "status": "OK",
      "errorMessage": "",
      "data": [
        {
          "memberId": 1,
          "firmId": 2,
          "ksmnId": "1",
          "yskId": "1",
          "familyId": "1",
          "memberName": "Arjan Ramjibhai Chabbhaiya",
          "fatherName": "Ramji Devrambhai Chabbhaiya",
          "nokh": "Chabbhaiya",
          "dob": "1970-12-25T00:00:00.000Z",
          "gender": "M",
          "bloodGroup": "A+",
          "contact": "974541651",
          "contact2": "98745641251",
          "kutchNative": "Rasaliya"
        },
        {
          "memberId": 2,
          "firmId": 3,
          "ksmnId": "2",
          "yskId": "15155",
          "familyId": "414541",
          "memberName": "Manjuben Arjanbhai Chabhhaiya",
          "fatherName": "Veljibhai Dayabhai Velani",
          "nokh": "Chabhhaiya",
          "dob": "1971-07-20T00:00:00.000Z",
          "gender": "F",
          "bloodGroup": "AB+",
          "contact": "9875454564",
          "contact2": "897584654",
          "kutchNative": "Rasaliya"
        }
      ]
    }
    ```

- `POST` /api/member

  - Request Body

    ```json
    {
      "firmId": 3,
      "ksmnId": "2",
      "yskId": "15155",
      "familyId": "414541",
      "memberName": "Manjuben Arjanbhai Chabhhaiya",
      "fatherName": "Veljibhai Dayabhai Velani",
      "nokh": "Chabhhaiya",
      "dob": "1971-07-20",
      "gender": "F",
      "bloodGroup": "AB+",
      "contact": "9875454564",
      "contact2": "897584654",
      "kutchNative": "Rasaliya"
    }
    ```

  - Response
    ```json
    {
      "status": "OK",
      "errorMessage": "",
      "data": {
        "memberId": 2,
        "firmId": 3,
        "ksmnId": "2",
        "yskId": "15155",
        "familyId": "414541",
        "memberName": "Manjuben Arjanbhai Chabhhaiya",
        "fatherName": "Veljibhai Dayabhai Velani",
        "nokh": "Chabhhaiya",
        "dob": "1971-07-20T00:00:00.000Z",
        "gender": "F",
        "bloodGroup": "AB+",
        "contact": "9875454564",
        "contact2": "897584654",
        "kutchNative": "Rasaliya"
      }
    }
    ```

- `GET` /api/paymentdetail

  - Response
    ```json
    {
      "status": "OK",
      "errorMessage": "",
      "data": [
        {
          "paymentId": 1,
          "paymentMode": "Cash",
          "paymentFor": "Chitthi",
          "amount": 20000.5,
          "transactionId": "15",
          "receiptNumber": "45"
        }
      ]
    }
    ```

- `POST` /api/paymentdetail

  - Request Body

    ```json
    {
      "paymentMode": "Cash",
      "paymentFor": "Membership Fees",
      "amount": 11000.0,
      "transactionId": "101",
      "receiptNumber": "124"
    }
    ```

  - Response

    ```json
    {
      "status": "OK",
      "errorMessage": "",
      "data": {
        "paymentId": 2,
        "paymentMode": "Cash",
        "paymentFor": "Membership Fees",
        "amount": 11000,
        "transactionId": "101",
        "receiptNumber": "124"
      }
    }
    ```
