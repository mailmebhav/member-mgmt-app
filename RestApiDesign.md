## Rest Api Design

### Tables

- ADMIN_AUTH
    - USERNAME     VARCHAR(200)  NOT NULL PRIMARY KEY
    - PASSWORD     VARCHAR(200)  NOT NULL
    - TOKEN        VARCHAR(300) 
    - EXPIRES      NUMBER NOT NULL

- MEMBER_DETAIL
    - MEMBER_ID    NUMBER NOT  NULL PRIMARY KEY (SEQUENCE)
    - FIRM_ID      NUMBER      NOT  NULL  REFERENCES FIRM_DETAIL(FIRM_ID)
    - KSMN_ID      VARCHAR(20) 
    - YSK_ID       VARCHAR(20)
    - FAMILY_ID    VARCHAR(20)
    - MEMBER_NAME  VARCHAR(20) NOT NULL
    - FATHER_NAME  VARCHAR(20) NOT NULL
    - NOKH         VARCHAR(20) NOT NULL
    - DOB          DATE        NOT NULL
    - GENDER       CHAR(1)     NOT NULL
    - BLOOD GROUP  VARCHAR(4)
    - CONTACT      VARCHAR(10) NOT NULL
    - CONTACT2     VARCHAR(10)
    - KUTCH_NATIVE VARCHAR(20) 

- FIRM_DETAIL
    - FIRM_ID      NUMBER      NOT  NULL PRIMARY KEY(SEQUENCE)
    - FIRM_NAME    VARCHAR(40) NOT NULL 
    - AREA         VARCHAR(30) 
    - PINCODE      VARCHAR(6)

- PAYMENT_DETAIL
    - PAYMENT_ID   NUMBER      NOT  NULL PRIMARY KEY(SEQUENCE)
    - PAYMENT_MODE VARCHAR(30)
    - PAYMENT_FOR  VARCHAR(50)
    - AMOUNT       DOUBLE
    - TRANSACTION_ID VARCHAR(50)
    - RECEIPT_NUMBER VARCHAR(30)

### Token to be expired after every 4 hours

### Validate token on each call.If invalid redirect to login page.



### API'S

- POST /auth/login
    - Request Body

    `{"username": "<hashed_username>","password": "<hashed_password>"}`

    - Response

    `200` : `{"status": "OK", "errorMessage": null, "data" : {"token" : "<hashed_token>"}}` 

    `401` : `{"status": "UNAUTHORIZED", "errorMessage": "User Name or Password is mismatched.", "data" : null}` 

- DELETE /auth/logout/{hashed_token}
    
    `200` : `{"status": "OK", "errorMessage": null, "data" : "Token deleted successfully."}`

- POST /member/add






