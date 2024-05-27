### API'S

#### Error Responses

-   Unauthorized - If Authorization header is not set or the value is incorrect. Also, in case if the token is already expired.
    - HTTP Status `401`
    ```json
    {
        "status": "UNAUTHORIZED",
        "errorMessage": "Invalid Auth Token",
        "data": null
    }
    ```
-   Internal Server Error
    - HTTP Status `500`
    ```json
    {
        "status": "INTERNAL_SERVER_ERROR",
        "errorMessage": "\nInvalid `prisma.member.update()` invocation:\n\n{\n  where: {\n    memberId: undefined,\n?   AND?: MemberWhereInput | MemberWhereInput[],\n?   OR?: MemberWhereInput[],\n?   NOT?: MemberWhereInput | MemberWhereInput[],\n?   firmId?: IntFilter | Int,\n?   ksmnId?: StringFilter | String,\n?   yskId?: StringFilter | String,\n?   familyId?: StringFilter | String,\n?   memberName?: StringFilter | String,\n?   fatherName?: StringFilter | String,\n?   nokh?: StringFilter | String,\n?   dob?: DateTimeFilter | DateTime,\n?   gender?: StringFilter | String,\n?   bloodGroup?: StringFilter | String,\n?   contact?: StringFilter | String,\n?   contact2?: StringFilter | String,\n?   kutchNative?: StringFilter | String,\n?   firm?: FirmRelationFilter | FirmWhereInput,\n?   payment?: PaymentDetailListRelationFilter\n  },\n  data: {\n    firmId: 3,\n    ksmnId: \"2\",\n    yskId: \"15155\",\n    familyId: \"414541\",\n    memberName: \"Manjuben Arjanbhai Chabhhaiya\",\n    fatherName: \"Veljibhai Dayabhai Velani\",\n    nokh: \"Chabhhaiya\",\n    dob: new Date(\"1965-07-20T00:00:00.000Z\"),\n    gender: \"F\",\n    bloodGroup: \"AB+\",\n    contact: \"9875454564\",\n    contact2: \"897584654\",\n    kutchNative: \"Rasaliya\"\n  },\n  include: {\n    firm: true\n  }\n}\n\nArgument `where` of type MemberWhereUniqueInput needs at least one of `memberId` arguments. Available options are marked with ?.",
        "data": null
    }
    ```