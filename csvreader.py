import csv

with open('top-1m.csv', 'r') as csvFile:

    wf = open('top-domains.txt', 'a')

    reader = csv.reader(csvFile, delimiter=',')

    count = 1000

    for row in reader:
        count -= 1
        wf.write(row[1])
        wf.write('\n')

        if count == 0:
            break
    
    wf.close()


