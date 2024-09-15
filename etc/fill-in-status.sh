#!/bin/bash
echo inserting testdata...
#export BASE_URL=http://localhost:8080
export BASE_URL=https://status.blink.azure.six-group.com

insertDay() {
    FROM_HOUR=$1
    TO_HOUR=$2

    SUCCESS_COUNT=$3
    ERROR_COUNT=$4

    for h in $(seq $FROM_HOUR $TO_HOUR);
    do
        HOUR=$(printf "%02d" $h)
        DAY="2024-$(printf "%02d" $MONTH)-$(printf "%02d" $d)"
        URL=${BASE_URL}/api/participants/${p}/${DAY}/${HOUR}:00/${srv}/v3
        echo inserting for participant $p day ${DAY} hour ${HOUR}, service ${srv}: $URL
        curl -H 'Content-Type: application/json' -d "{
                                                 \"successCount\": ${SUCCESS_COUNT},
                                                 \"clientErrorCount\": 0,
                                                 \"serverErrorCount\": ${ERROR_COUNT}
                                               }" -X POST ${URL}
    done
}

insertParticipant() {

    FROM_DAY=$1
    TO_DAY=$2

    FROM_HOUR=$3
    TO_HOUR=$4

    SUCCESS_COUNT=$5
    ERROR_COUNT=$6

    for d in $(seq $FROM_DAY $TO_DAY);
    do
        insertDay $FROM_HOUR $TO_HOUR $SUCCESS_COUNT $ERROR_COUNT &
    done
}

insertData() {
    FROM_PARTICIPANT=$1
    TO_PARTICIPANT=$2

    MONTH=$3

    FROM_DAY=$4
    TO_DAY=$5

    FROM_HOUR=$6
    TO_HOUR=$7

    SUCCESS_COUNT=$8
    ERROR_COUNT=$9

    SERVICES=${10//,/ }

    for srv in $SERVICES;
    do
        for p in $(seq $FROM_PARTICIPANT $TO_PARTICIPANT);
        do
            insertParticipant $FROM_DAY $TO_DAY $FROM_HOUR $TO_HOUR $SUCCESS_COUNT $ERROR_COUNT
        done
    done
}

insertData 1 1 9 10 15 6 22 988 90 Platform,Permissions       # participant 1, am 10.-15. September um 6-22 Uhr jeweils 988 Success und 90 fail
insertData 2 4 9 10 15 6 22 130 1000 AIS,PSS      # participant 2, am 10.-15. September um 6-22 Uhr jeweils 130 Success und 1000 fail
insertData 1 4 8 1 31 10 10 100 0 Healthcheck     # participants 1-4, vom 1.-31. August jeden Tag um 10 Uhr 100 Success
insertData 1 4 9 1 16 15 23 100 2 Healthcheck     # participants 1-4, vom 1.-14. September jeden Tag um 10 Uhr 100 Success
insertData 1 1 9 3 3 10 14 50 30 Healthcheck      # participant 1, am 3. September zwischen 10 und 14 Uhr jeweils 50 success und 30 fail
insertData 1 1 9 4 7 10 10 200 13 Healthcheck     # participant 1, am 4.-7. September um 10 Uhr jeweils 200 Success und 13 fail
insertData 1 1 9 10 12 7 9 0 1000 Healthcheck     # participant 1, am 10.-12. September um 10 Uhr jeweils 0 Success und 1000 fail
insertData 1 1 9 1 4 6 22 13 1000 Healthcheck     # participant 1, am 1.-4. September um 6-22 Uhr jeweils 13 Success und 1000 fail
insertData 1 4 9 15 15 0 23 200 3 Healthcheck     # participant 1-4, am 15. September jede Stunde 200 success und 3 fail
