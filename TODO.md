### leaderboard
- most posts? 
- most wins
- biggest revenue
- biggest percent gain
#### how?
search all orders within date range, 
filter by "isWinning",
reduce into array object of usernames and counts of winning plays: {name:danny, count: 10}
formula? 

leaderboard changes every cycle
1 cycle = 12 weeks
x orders / 12 weeks = submitRate
x wins / x orders = winRate

leaderBoard consistentRate = submitRate * winRate


### point system: 
- order submission - 5
- watch order - 1
- isWinning each week - 1most posts? 

plays are calculated on a x Week basis .

need to input order, with exit date, by that date, calculate if isWinning or not...
exitStrategy == date, or lossPrice or profitPrice (calculator button to convert %/$)


### teaching; 
when placing order, always have exit in mind, either time or dollar value.
(so ask when exit on the form, either date-picker or dollar amount.)
if price hits dollar amount, or date is reached, calculate isWinning.
