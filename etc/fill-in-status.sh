#!/bin/bash
echo inserting testdata...
export BASE_URL=http://localhost:8080

for srv in AIS PSS;
do
    for p in $(seq 1 4);
    do
        for i in $(seq 10 14);
        do
            for h in $(seq 0 24);
            do
                HOUR=$(printf "%02d" $h)
                echo inserting for participant $p day $i hour ${HOUR}, service ${srv}
                curl -H 'Content-Type: application/json' -d '{
                                                         "successCount": 222,
                                                         "clientErrorCount": 0,
                                                         "serverErrorCount": 0
                                                       }' -X POST ${BASE_URL}/api/participants/${p}/2024-09-${i}/${HOUR}:00/${srv}/v3
            done
        done
    done
done
