export const isValidCSV = (data: string[][]) => {
    return data.length > 1 &&
        data[0].length === 2 &&
        data[0].includes("age") &&
        data[0].includes("what_bothers_you");
}

export const parseCSV = (data: string[][]) => {
    const result: any = [];
    if (data.length > 1) {
        const ageInd = data[0].findIndex(item => item === "age")
        const bothersInd = data[0].findIndex(item => item === "what_bothers_you")
        data.map((item: string[], index: number) => {
            if (index !== 0 && item.length === 2) {

                result.push({
                    [data[0][bothersInd]]: item[bothersInd],
                    [data[0][ageInd]]: parseInt(item[ageInd])
                })
            }
        })
    }
    return result;
}