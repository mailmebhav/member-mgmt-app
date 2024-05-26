### API'S

#### Member

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
