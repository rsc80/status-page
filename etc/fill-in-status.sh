#!/bin/bash
echo inserting testdata...
export BASE_URL=http://localhost:8080
#export BASE_URL=https://status.blink.azure.six-group.com

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

    for srv in Healthcheck;
    do
        for p in $(seq $FROM_PARTICIPANT $TO_PARTICIPANT);
        do
            for d in $(seq $FROM_DAY $TO_DAY);
            do
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
            done
        done
    done
}

#insertData 1 4 8 1 31 10 10 100 0  # participants 1-4, vom 1.-31. August jeden Tag um 10 Uhr 100 Success
#insertData 1 4 9 1 14 10 10 100 0  # participants 1-4, vom 1.-14. September jeden Tag um 10 Uhr 100 Success
#insertData 1 1 9 3 3 10 14 50 30   # participant 1, am 3. September zwischen 10 und 14 Uhr jeweils 50 success und 30 fail
#insertData 1 1 9 4 7 10 10 200 13   # participant 1, am 4.-7. September um 10 Uhr jeweils 200 Success und 13 fail
#insertData 1 1 9 10 12 10 10 0 1000   # participant 1, am 10.-12. September um 10 Uhr jeweils 0 Success und 1000 fail
insertData 1 4 9 14 14 0 23 200 3  # participant 1-4, am 14. September jede Stunde 200 success und 3 fail
