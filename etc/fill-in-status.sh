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

insertData 1 4 8 1 31 10 10 100 0
insertData 1 4 9 1 14 10 10 100 0
insertData 1 1 9 3 3 11 11 50 30
insertData 1 4 9 14 14 0 23 200 3
