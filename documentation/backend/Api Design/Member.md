### API'S

#### Member

- `GET` /api/member
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
              "kutchNative": "Rasaliya",
              "firm": {
                  "firmId": 3,
                  "firmName": "JK Saw Mill",
                  "area": "Yelahanka",
                  "pincode": 560090
              }
          }
      ]
    }
    ```

- `POST` /api/member
  - Request Header
    - `Authorization` - b41fdc1516e6b5dd1fccc05f5273f6b8ae85691ac7113a0577a2053ea4c399e5

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
    - HTTP Status `200`
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
          "kutchNative": "Rasaliya",
          "firm": {
              "firmId": 3,
              "firmName": "JK Saw Mill",
              "area": "Yelahanka",
              "pincode": 560090
          }
      }
    }
    ```

- `PUT` /api/member
  - Request Header
    - `Authorization` - b41fdc1516e6b5dd1fccc05f5273f6b8ae85691ac7113a0577a2053ea4c399e5

  - Request Body

    ```json
    {
      "memberId": 2,
      "firmId": 3,
      "ksmnId": "2",
      "yskId": "15155",
      "familyId": "414541",
      "memberName": "Manjuben Arjanbhai Chabhhaiya",
      "fatherName": "Veljibhai Dayabhai Velani",
      "nokh": "Chabhhaiya",
      "dob": "1965-07-20",
      "gender": "F",
      "bloodGroup": "AB+",
      "contact": "9875454564",
      "contact2": "897584654",
      "kutchNative": "Rasaliya"
    }
    ```

  - Response
    - HTTP Status `200`
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
          "dob": "1965-07-20T00:00:00.000Z",
          "gender": "F",
          "bloodGroup": "AB+",
          "contact": "9875454564",
          "contact2": "897584654",
          "kutchNative": "Rasaliya",
          "firm": {
              "firmId": 3,
              "firmName": "JK Saw Mill",
              "area": "Yelahanka",
              "pincode": 560090
          }
      }
    }
    ```

- `DELETE` /api/member
  - Request Header
    - `Authorization` - b41fdc1516e6b5dd1fccc05f5273f6b8ae85691ac7113a0577a2053ea4c399e5

  - Request Body

    ```json
    {
      "memberId": 2,
      "firmId": 3,
      "ksmnId": "2",
      "yskId": "15155",
      "familyId": "414541",
      "memberName": "Manjuben Arjanbhai Chabhhaiya",
      "fatherName": "Veljibhai Dayabhai Velani",
      "nokh": "Chabhhaiya",
      "dob": "1965-07-20T00:00:00.000Z",
      "gender": "F",
      "bloodGroup": "AB+",
      "contact": "9875454564",
      "contact2": "897584654",
      "kutchNative": "Rasaliya",
      "firm": {
          "firmId": 3,
          "firmName": "JK Saw Mill",
          "area": "Yelahanka",
          "pincode": 560090
      }
    }
    ```

  - Response
    - HTTP Status `200`
    ```json
    {
      "status": "OK",
      "errorMessage": "",
      "data": " Member ID: 3 Member Name: Manjuben Arjanbhai Chabhhaiya Deleted successfully"
    }
    ```