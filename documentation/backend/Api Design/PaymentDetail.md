### API'S

#### PaymentDetail

- `GET` /api/paymentdetail
  - Request Header
      - `Authorization` - b41fdc1516e6b5dd1fccc05f5273f6b8ae85691ac7113a0577a2053ea4c399e5

  - Response
    - HTTP Status `200`
      ```json
      {
        "status": "OK",
        "errorMessage": "",
        "data": [
            {
                "paymentId": 1,
                "paymentMode": "Cash",
                "paymentFor": "Chitthi",
                "amount": 20000,
                "transactionId": "6163",
                "receiptNumber": "5642",
                "memberId": 4,
                "member": {
                    "memberId": 4,
                    "firmId": 2,
                    "ksmnId": "2",
                    "yskId": "1",
                    "familyId": "12321",
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
        ]
      }
      ```

- `POST` /api/paymentdetail
  - Request Header
    - `Authorization` - b41fdc1516e6b5dd1fccc05f5273f6b8ae85691ac7113a0577a2053ea4c399e5
  - Request Body

    ```json
    {
      "paymentMode": "Cash",
      "paymentFor": "Membership Fees",
      "amount": 11000.0,
      "transactionId": "101",
      "receiptNumber": "124",
      "memberId": 4
    }
    ```

  - Response
    - HTTP Status `200`
    ```json
    {
      "status": "OK",
      "errorMessage": "",
      "data": {
          "paymentId": 3,
          "paymentMode": "Cash",
          "paymentFor": "Membership Fees",
          "amount": 11000,
          "transactionId": "101",
          "receiptNumber": "124",
          "memberId": 4,
          "member": {
              "memberId": 4,
              "firmId": 2,
              "ksmnId": "2",
              "yskId": "1",
              "familyId": "12321",
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
    }
    ```

- `PUT` /api/paymentdetail
  - Request Header
    - `Authorization` - b41fdc1516e6b5dd1fccc05f5273f6b8ae85691ac7113a0577a2053ea4c399e5
  - Request Body

    ```json
    {
      "paymentId": 2,
      "paymentMode": "Cash",
      "paymentFor": "Membership Fees",
      "amount": 11001.0,
      "transactionId": "101",
      "receiptNumber": "124",
      "memberId": 4
    }
    ```

  - Response
    - HTTP Status `200`
    ```json
    {
      "status": "OK",
      "errorMessage": "",
      "data": {
          "paymentId": 2,
          "paymentMode": "Cash",
          "paymentFor": "Membership Fees",
          "amount": 11001,
          "transactionId": "101",
          "receiptNumber": "124",
          "memberId": 4,
          "member": {
              "memberId": 4,
              "firmId": 2,
              "ksmnId": "2",
              "yskId": "1",
              "familyId": "12321",
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
    }
    ```

- `DELETE` /api/paymentdetail
  - Request Header
    - `Authorization` - b41fdc1516e6b5dd1fccc05f5273f6b8ae85691ac7113a0577a2053ea4c399e5
  - Request Body

    ```json
    {
      "paymentId": 4,
      "paymentMode": "Cash",
      "paymentFor": "Membership Fees",
      "amount": 11000,
      "transactionId": "101",
      "receiptNumber": "124",
      "memberId": 4
    }
    ```

  - Response
    - HTTP Status `200`
    ```json
    {
      "status": "OK",
      "errorMessage": "",
      "data": "Payment ID: 4 Deleted successfully"
    }
    ```