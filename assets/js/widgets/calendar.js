let html =`
<div class="calendar" name="cal" id="calendar">
        <div class="cal-title">
        <button id="cal-prev-btn" class="cal-btn"><i class="fa-solid fa-arrow-left"></i></button>
            <p id="cal-month-year" >
                    January 2021
            </p>
        <button id="cal-next-btn" class="cal-btn"><i class="fa-solid fa-arrow-right"></i></button>
        <button id="cal-today-btn" class="cal-btn"><i class="fa-regular fa-calendar-days"></i></button>
        <div>
<table bgcolor="lightgrey"  cellpadding="15">



<thead>
    <tr>
        <!-- Here we have applied inline style 
             to make it more attractive-->
        <th style="color: white; background: rgba(156, 68, 68, 0.664);">
            Sun</th>
        <th style="color: white; background: purple;">
            Mon</th>
        <th style="color: white; background: purple;">
            Tue</th>
        <th style="color: white; background: purple;">
            Wed</th>
        <th style="color: white; background: purple;">
            Thu</th>
        <th style="color: white; background: purple;">
            Fri</th>
        <th style="color: white; background: rgba(156, 68, 68, 0.664);">
            Sat</th>
    </tr>
</thead>

<tbody>
    <tr>
        
        <td id="cal-d-1"></td>
        <td id="cal-d-2"></td>
        <td id="cal-d-3"></td>
        <td id="cal-d-4"></td>
        <td id="cal-d-5"></td>
        <td id="cal-d-6"></td>
        <td id="cal-d-7"></td>
    </tr>
    <tr></tr>
    <tr>
        
        <td id="cal-d-8"></td>
        <td id="cal-d-9"></td>
        <td id="cal-d-10"></td>
        <td id="cal-d-11"></td>
        <td id="cal-d-12"></td>
        <td id="cal-d-13"></td>
        <td id="cal-d-14"></td>
    </tr>
    <tr>
        
        <td id="cal-d-15"></td>
        <td id="cal-d-16"></td>
        <td id="cal-d-17"></td>
        <td id="cal-d-18"></td>
        <td id="cal-d-19"></td>
        <td id="cal-d-20"></td>
        <td id="cal-d-21"></td>
    </tr>
    <tr>
        
        <td id="cal-d-22"></td>
        <td id="cal-d-23"></td>
        <td id="cal-d-24"></td>
        <td id="cal-d-25"></td>
        <td id="cal-d-26"></td>
        <td id="cal-d-27"></td>
        <td id="cal-d-28"></td>
    </tr>
    <tr>
        
        <td id="cal-d-29"></td>
        <td id="cal-d-30"></td>
        <td id="cal-d-31"></td>
        <td id="cal-d-32"></td>
        <td id="cal-d-33"></td>
        <td id="cal-d-34"></td>
        <td id="cal-d-35"></td>
    </tr>
    <tr>
        
        <td id="cal-d-36"></td>
        <td id="cal-d-37"></td>
        <td id="cal-d-38"></td>
        <td id="cal-d-39"></td>
        <td id="cal-d-40"></td>
        <td id="cal-d-41"></td>
        <td id="cal-d-42"></td>
    </tr>
</tbody>
</table>

</div>

`
document.getElementById("cal-container").innerHTML=html;

function get_month_name(month){
    let m_arr=['January', 'February', 'March', 
    'April', 'May', 'June', 'July', 
    'August', 'September', 'October', 'November', 'December'];
    return m_arr[month];


}
function get_month(){
    
    return new Date().getMonth()


}
function get_year(){
    return new Date().getFullYear();
}
function is_leap(year){
    let isleap = false
    if(year%4==0){
        isleap =true
    }
    if(year%100==0){
        isleap =false
    }
    if(year%400 == 0){
        isleap = true
    }
    return isleap;
}
function days_in_month(month,year){
    if(month===1) {
        if( is_leap(year)){
        return 29;
        }else{
            return 28;
        }
    }
    
    if(month==5 || month===3 || month===10|| month===8) return 30;
    return 31;
    

}
function day1_month(month,year){
    const firstDay = new Date(year,month,1);
    return firstDay.getDay();

}
function get_prev(month,year){
    if(month===0){
        return [11,year-1]
    }
    return[month-1,year]
}
function get_next(month,year){
    if(month===11){
        return [0,year+1]
    }
    return[month+1,year]
}
let displayMonth = get_month();
let displayYear = get_year();
function populate(month,year){
    document.getElementById('cal-month-year').innerText=`${get_month_name(month)} ${year}`
    displayMonth = month;
    displayYear = year;
    let f_day = day1_month(month,year)+1;
    let dm = days_in_month(month,year);
    let ttt= false;
    let dd=  new Date().getDate();
    if(month===get_month() && year===get_year()){
        ttt=true;

    }
    console.log(f_day);
    let start_prev_days = days_in_month(get_prev(month,year)[0],get_prev(month,year)[1]);
    for (let index = 1; index < f_day; index++) {
        let td = document.getElementById(`cal-d-${index}`)
        td.innerText = start_prev_days-f_day+index+1;
        td.classList.remove("this-month");
        td.classList.add("last-month")
        
    }

    
    
    
    for (let int = 1; int <= dm; int++) {
        let td = document.getElementById(`cal-d-${int+f_day-1}`)
        td.innerText = int;
        if(dd==int && ttt){
            td.classList.add("cal-today")
        }else{
            td.classList.remove("cal-today")
        }
        td.classList.remove("last-month");
        td.classList.add("this-month")
        td.classList.remove("next-month")

        
    }
    for (let int = dm+f_day; int <= 42; int++) {
        let td = document.getElementById(`cal-d-${int}`)
        td.innerText = int-dm-f_day+1;
        td.classList.add("next-month");
        td.classList.remove("this-month")
        console.log(`cal-d-${f_day+int}`);
        
    }

}

populate(get_month(),get_year());
function populate_next(){
    populate(get_next(displayMonth,displayYear)[0],get_next(displayMonth,displayYear)[1])
}
function populate_prev(){
    populate(get_prev(displayMonth,displayYear)[0],get_prev(displayMonth,displayYear)[1])
}
let populate_today = ()=>{

populate(get_month(),get_year());
}
document.getElementById('cal-prev-btn').onclick=populate_prev;
document.getElementById('cal-next-btn').onclick=populate_next;
document.getElementById('cal-today-btn').onclick=populate_today;