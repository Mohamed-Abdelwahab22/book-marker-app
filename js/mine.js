


var bookNameInput =  document.getElementById("bookNameId");
var bookUrlInput =  document.getElementById("bookUrlId");
var mainButton = document.getElementById("MainButton");

var allData = [];

if(localStorage.getItem("item") != null){

    allData = JSON.parse(localStorage.getItem("item"));

    displayData()

}


function addBookMark(){

    var nameCheck = /[A-Z]{1}[a-z]{1,10}$/


    var urlCheck = /^(https:\/\/)?(www\.)[a-zA-Z0-9]{2,10}\.[a-z]{2,4}$/
    
   
    var bookNameValue = bookNameInput.value;
    var bookUrlValue = bookUrlInput.value;

    var data = {
        bookName : bookNameValue , 
        bookUrl : bookUrlValue
    }
    
    if( nameCheck.test(bookNameValue) && urlCheck.test(bookUrlValue) ){
        allData.push(data)

        localStorage.setItem("item" , JSON.stringify(allData))

        clearData()

        displayData()

        document.getElementById("userAlert1").innerHTML = ""
        document.getElementById("userAlert2").innerHTML = ""
        document.getElementById("userAlert1").classList.remove("alert" , "alert-danger")
        document.getElementById("userAlert2").classList.remove("alert" , "alert-danger")
    }
    else if(bookNameValue == "" || bookUrlValue == ""){
        if(bookNameValue == "" && bookUrlValue == ""){
            document.getElementById("userAlert1").innerHTML = "name is empty"
            document.getElementById("userAlert1").classList.add("alert" , "alert-danger")
            document.getElementById("userAlert2").innerHTML = "URL is empty"
            document.getElementById("userAlert2").classList.add("alert" , "alert-danger")
        }
        else if(bookNameValue == "" ){
            document.getElementById("userAlert1").innerHTML = "name is empty"
            document.getElementById("userAlert1").classList.add("alert" , "alert-danger")
            document.getElementById("userAlert2").innerHTML = ""
            document.getElementById("userAlert2").classList.remove("alert" , "alert-danger")
            if(bookNameValue == "" && ! urlCheck.test(bookUrlValue)){
                document.getElementById("userAlert1").innerHTML = "name is empty"
                document.getElementById("userAlert1").classList.add("alert" , "alert-danger")
                document.getElementById("userAlert2").innerHTML = "URL not match 'please put url in right form'"
                document.getElementById("userAlert2").classList.add("alert" , "alert-danger")
            }
        }
    
        else if(bookUrlValue == ""){
                document.getElementById("userAlert2").innerHTML = "URL is empty"
                document.getElementById("userAlert2").classList.add("alert" , "alert-danger")
                document.getElementById("userAlert1").innerHTML = ""
                document.getElementById("userAlert1").classList.remove("alert" , "alert-danger")
            if(bookUrlValue == "" && ! nameCheck.test(bookNameValue)){
                document.getElementById("userAlert2").innerHTML = "URL is empty"
                document.getElementById("userAlert2").classList.add("alert" , "alert-danger")
                document.getElementById("userAlert1").innerHTML = "name not match 'start with capital letter and write from 3-8 char'"
                document.getElementById("userAlert1").classList.add("alert" , "alert-danger")
            }
        }
        
        
    }
    else if(! nameCheck.test(bookNameValue) && ! urlCheck.test(bookUrlValue)){
            document.getElementById("userAlert1").innerHTML = "name not match 'start with capital letter and write from 3-8 char'"
            document.getElementById("userAlert1").classList.add("alert" , "alert-danger")
            document.getElementById("userAlert2").innerHTML = "URL not match 'please put url in right form'"
            document.getElementById("userAlert2").classList.add("alert" , "alert-danger")
            clearData()
    }
    else if(nameCheck.test(bookNameValue) && !urlCheck.test(bookUrlValue)){
        document.getElementById("userAlert2").innerHTML = "URL not match 'please put url in right form'"
        document.getElementById("userAlert2").classList.add("alert" , "alert-danger")
        document.getElementById("userAlert1").innerHTML = ""
            document.getElementById("userAlert1").classList.remove("alert" , "alert-danger")

    }
    else if( ! nameCheck.test(bookNameValue) && urlCheck.test(bookUrlValue)){
        document.getElementById("userAlert1").innerHTML = "name not match 'start with capital letter and write from 3-8 char'"
        document.getElementById("userAlert1").classList.add("alert" , "alert-danger")
        document.getElementById("userAlert2").innerHTML = ""
        document.getElementById("userAlert2").classList.remove("alert" , "alert-danger")
    }
    
}

function displayData(){
    
    var hasala = ``;

    for(var i = 0 ; i < allData.length ; i++){

        hasala += 
            `
                <tr>
                    <td><h3>` + allData[i].bookName + `</h3></td>
                    <td>
                    <button onclick="updateData(`+ i +`)" class="btn btn-outline-warning">Upadte</button>
                    <a href="` + allData[i].bookUrl + `" target="_blank" class="btn btn-outline-primary">Vists</a>
                    <button onclick="delteBookMark(` + i + `)" class="btn btn-outline-danger">Delete</button>
                    </td>
                </tr>
            `
            
    }

    document.getElementById("bookMarkList").innerHTML = hasala;

}

function clearData(){
    
    bookNameInput.value = "";
    bookUrlInput.value = ""; 

}

function delteBookMark(dataIndex){

    allData.splice(dataIndex , 1);

    displayData()

    localStorage.setItem("item" , JSON.stringify(allData));


}

function SearchBook(userWord){

    var hasala = ``;

    for(var i = 0 ; i < allData.length ; i++){

        if(allData[i].bookName.toLowerCase().includes(userWord.toLowerCase())){

            hasala +=   
                `
                <tr>
                    <td><h3>` + allData[i].bookName + `</h3></td>
                    <td>
                    <button onclick="updateData(`+ i +`)" class="btn btn-outline-warning">Upadte</button>
                    <a href="` + allData[i].bookUrl + `" target="_blank" class="btn btn-outline-primary">Vists</a>
                    <button onclick="delteBookMark(` + i + `)" class="btn btn-outline-danger">Delete</button>
                    </td>
                </tr>
                `
        }
        document.getElementById("bookMarkList").innerHTML = hasala;

    }

}

function updateData(dataIndex){

    bookNameInput.value = allData[dataIndex].bookName;
    bookUrlInput.value = allData[dataIndex].bookUrl;
    mainButton.innerHTML = "Update Bookmark"
    mainButton.classList.add("btn" , "btn-outline-light")
    mainButton.setAttribute("onclick" , "updateCurrentData("+ dataIndex + ")")

}

function updateCurrentData(dataIndex){

    var nameCheck = /[A-Z]{1}[a-z]{1,10}$/


    var urlCheck = /^(https:\/\/)?(www\.)[a-zA-Z0-9]{2,10}\.[a-z]{2,4}$/
    
   
    var bookNameValue = bookNameInput.value;
    var bookUrlValue = bookUrlInput.value;

    var data = {
        bookName : bookNameValue , 
        bookUrl : bookUrlValue
    }

    if( nameCheck.test(bookNameValue) && urlCheck.test(bookUrlValue) ){
        allData[dataIndex].bookName = bookNameInput.value;
        allData[dataIndex].bookUrl = bookUrlInput.value;

        displayData()

        clearData()

        localStorage.setItem("item" , JSON.stringify(allData))

        mainButton.innerHTML = "Submit";
        mainButton.classList.remove("btn-outline-primary")
        mainButton.setAttribute("onclick" , "addBookMark()")
    }
    else if(bookNameValue == "" || bookUrlValue == ""){
        if(bookNameValue == "" && bookUrlValue == ""){
            document.getElementById("userAlert1").innerHTML = "name is empty"
            document.getElementById("userAlert1").classList.add("alert" , "alert-danger")
            document.getElementById("userAlert2").innerHTML = "URL is empty"
            document.getElementById("userAlert2").classList.add("alert" , "alert-danger")
        }
        else if(bookNameValue == "" ){
            document.getElementById("userAlert1").innerHTML = "name is empty"
            document.getElementById("userAlert1").classList.add("alert" , "alert-danger")
            document.getElementById("userAlert2").innerHTML = ""
            document.getElementById("userAlert2").classList.remove("alert" , "alert-danger")
            if(bookNameValue == "" && ! urlCheck.test(bookUrlValue)){
                document.getElementById("userAlert1").innerHTML = "name is empty"
                document.getElementById("userAlert1").classList.add("alert" , "alert-danger")
                document.getElementById("userAlert2").innerHTML = "URL not match 'please put url in right form'"
                document.getElementById("userAlert2").classList.add("alert" , "alert-danger")
            }
        }
        else if(bookUrlValue == ""){
            document.getElementById("userAlert2").innerHTML = "URL is empty"
            document.getElementById("userAlert2").classList.add("alert" , "alert-danger")
            document.getElementById("userAlert1").innerHTML = ""
            document.getElementById("userAlert1").classList.remove("alert" , "alert-danger")
        if(bookUrlValue == "" && ! nameCheck.test(bookNameValue)){
            document.getElementById("userAlert2").innerHTML = "URL is empty"
            document.getElementById("userAlert2").classList.add("alert" , "alert-danger")
            document.getElementById("userAlert1").innerHTML = "name not match 'start with capital letter and write from 3-8 char'"
            document.getElementById("userAlert1").classList.add("alert" , "alert-danger")
        }
    }
    }
    else if(! nameCheck.test(bookNameValue) && ! urlCheck.test(bookUrlValue)){
        document.getElementById("userAlert1").innerHTML = "name not match 'start with capital letter and write from 3-8 char'"
        document.getElementById("userAlert1").classList.add("alert" , "alert-danger")
        document.getElementById("userAlert2").innerHTML = "URL not match 'please put url in right form'"
        document.getElementById("userAlert2").classList.add("alert" , "alert-danger")

}
else if(nameCheck.test(bookNameValue) && !urlCheck.test(bookUrlValue)){
    document.getElementById("userAlert2").innerHTML = "URL not match 'please put url in right form'"
    document.getElementById("userAlert2").classList.add("alert" , "alert-danger")
    document.getElementById("userAlert1").innerHTML = ""
    document.getElementById("userAlert1").classList.remove("alert" , "alert-danger")

}
else if( ! nameCheck.test(bookNameValue) && urlCheck.test(bookUrlValue)){
    document.getElementById("userAlert1").innerHTML = "name not match 'start with capital letter and write from 3-8 char'"
    document.getElementById("userAlert1").classList.add("alert" , "alert-danger")
    document.getElementById("userAlert2").innerHTML = ""
    document.getElementById("userAlert2").classList.remove("alert" , "alert-danger")
}

}