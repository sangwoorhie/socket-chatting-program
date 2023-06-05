const reviewList = document.querySelector('.reviewList');
window.onload=getReview(movieId);

//리뷰 불러오기
function getReview(movieNum){
    // 해당 영화 ID에 관련된 리뷰만 불러오기
    findItem().filter(v=>{
        if(JSON.parse(localStorage.getItem(v)).movieNumber==movieNum)return v;
    }).forEach(v=>{
        const json=JSON.parse(localStorage.getItem(v));
        const user = json.ID;
        const contentValue = json.content;

        const reviewCard = document.createElement('li');
        reviewCard.setAttribute("class","review_card");
        reviewCard.innerHTML=`
            <div class="review">
                <h4>${user}</h4>
                <p>${contentValue}</p>
                <button type="button" onclick="updateReview(this)" id="updateButton">수정</button>
                <button type="button" onclick="deleteReview(this)" id="deleteButton">X</button>
            </div>
        `;
        reviewList.appendChild(reviewCard);
    })
}

// 리뷰 새로 등록
function createReview(id){
    let key = Date.now()+String(Math.floor(Math.random()*100));
    const user = document.querySelector('#reviewUser').value;
    const pw = document.querySelector('#reviewPassword').value;
    const contentValue = document.querySelector('#reviewContent').value;
    const obj = {
        movieNumber:id,
        ID:user,
        password:pw,
        content:contentValue
    }
    localStorage.setItem(key,JSON.stringify(obj));
    window.location.reload();
}

//리뷰 수정
function updateReview(tag){
    const updateItem = findItem(tag,'U');
    const validation = passwordVerify(updateItem);
    if(validation){
        const willUpdateContent = prompt('수정할 내용을 적어주세요.');
        let item = JSON.parse(localStorage.getItem(updateItem));
        item.content=willUpdateContent;
        localStorage.setItem(updateItem,JSON.stringify(item));
        window.location.reload();
    }else if(validation==null){
        return;
    }else{
        alert('비밀번호가 일치하지않습니다. 다시 시도해주세요.');
    }
}

//리뷰 삭제
function deleteReview(tag){
    const deleteItem = findItem(tag,'D');
    const validation = passwordVerify(deleteItem);
    if(validation){
        localStorage.removeItem(deleteItem);
        window.location.reload();
    }else if(validation==null){
        return;
    }else{
        alert('비밀번호가 일치하지않습니다. 다시 시도해주세요.');
    }
}
// 비밀번호 검증
function passwordVerify(item){
    const pwInput = prompt('등록된 비밀번호를 입력해주세요.');
    const pw = JSON.parse(localStorage.getItem(item)).password;
    if(pw==pwInput){
        return true;
    }else if(pwInput==null){
        return null;
    }else{
        return false;
    }
}
// 로컬 스토리지 내 해당 아이템 반환
function findItem(t=null,word='R'){
    const reviewArray = Object.keys(localStorage);
    if(word=='R'){
        return reviewArray;
    }else{
        const userId = t.parentNode.getElementsByTagName('h4')[0].innerHTML;
        const item = reviewArray.filter(v=>{
            if(JSON.parse(localStorage.getItem(v)).ID==userId)return v;
        });
        return item;
    }
}