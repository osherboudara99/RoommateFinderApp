

with open('C:\\Users\\vidas\\Git Projects\\SeniorProject\\src\\consts\\all_us_zipcodes_fixedd.csv', 'w') as f_out, open("C:\\Users\\vidas\\Git Projects\\SeniorProject\\src\\consts\\all_us_zipcodes.csv", "r") as f_in:
    for line in f_in:
        sep = '$'
        new_str = line.split(sep, 1)[0]
        #f_out.write(new_str + "\n")
        #print(line.split(sep, 1)[1:])
        # print(new_str[6:])
        firstPart = new_str[0:6]
        #secondPart = new_str[6:].replace(",", " ")
        
        secondPart = new_str[6:].split(',')[0] + "," + new_str[6:].split(',')[1]  + "," + new_str[6:].split(',')[2].title()
        fullString = firstPart + secondPart
        #print(secondPart)
        #print(fullString)
        f_out.write(fullString + "\n")
