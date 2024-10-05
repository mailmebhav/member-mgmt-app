### API'S

#### Member

- `GET` `/api/member/inactive`
	- __Description__ : **Returns only Inactive Members**
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
					"memberId": 1064,
					"firmId": 100,
					"ksmnId": null,
					"yskId": null,
					"familyId": null,
					"memberName": "TEST",
					"fatherName": "TEST",
					"nokh": "TEST",
					"dob": "1980-11-23T18:30:00.000Z",
					"gender": "M",
					"bloodGroup": null,
					"contact": null,
					"contact2": null,
					"kutchNative": null,
					"activeMember": false,
					"firm": {
						"firmId": 100,
						"firmName": "TEST",
						"area": "TEST",
						"pincode": 560092,
						"firmType": "Primary",
						"activeFirm": false
					}
				}
				]
		}
	```
