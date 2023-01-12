import sys
# import numpy as np
# import pandas as pd
# from sklearn import ...

for line in sys.stdin:
    line = line.strip()
    num = line.split(" ")[0]
    chars = line.split(" ")[1]
    chars_rep = chars.replace("+","") if "+" in chars else chars.replace("-","")
    d ={}
    for ch in range(len(chars_rep)):
        d[chars_rep[ch]] = int(num[ch])
    total1 = 0
    total2 = 0
    b_oper,a_oper = chars.split("+")[0] if "+" in chars else chars.split("-")[0],chars.split("+")[1] if "+" in chars else chars.split("-")[1]
    print(b_oper,a_oper)
    for char in b_oper:
        total1 = total1*10+d[char]
        print(total1,"1")
    for char in a_oper:
        total2 = total2*10+d[char]
        print(total2)
        
    total = total1+total2 if "+" in line else total1-total2
    print(total)
    
    
    
