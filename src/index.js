// 1. 페이지 로드 시 ID입력창 autofocus
const $id = document.getElementById('id')
const $idMsg = document.getElementById('id-msg')
window.addEventListener('load', () => $id.focus())

// 2. 유효성 검사 로직

const $pw = document.getElementById('pw')
const $pwMsg = document.getElementById('pw-msg')

const $pwCheck = document.getElementById('pw-check')
const $pwCheckMsg = document.getElementById('pw-check-msg')

const REGEX_ID = new RegExp('^[a-z0-9_-]{5,20}$')
const REGEX_PW = new RegExp('^[a-zA-Z0-9]{8,16}$')

const ERROR_MSG = {
    required: '필수 정보입니다.',
    invalidId: '5~20자. 영문 소문자, 숫자. 특수기호(_),(-)만 사용 가능합니다.',
    invalidPw: '8~16자. 영문 대/소문자, 숫자 사용 가능합니다.',
    invalidPwCheck: '비밀번호와 일치하지 않습니다.',
}

// 3. 커스텀 에러 메시지
const checkRegex = (target) => {
    const { id, value } = target
    if (value.length === 0) {
        return 'required'
    } else {
        switch (id) {
            case 'id':
                return REGEX_ID.test(value) ? true : 'invalidId'
            case 'pw':
                return REGEX_PW.test(value) ? true : 'invalidPw'
            case 'pw-check':
                return $pw.value === value ? true : 'invalidPwCheck'
            default:
                return
        }
    }
}

const checkValidation = (target, msgTarget) => {
    const isValid = checkRegex(target)
    if (isValid !== true) {
        target.classList.add('border-red-600')
        msgTarget.innerText = ERROR_MSG[isValid]
    } else {
        target.classList.remove('border-red-600')
        msgTarget.innerText = ''
    }
    return isValid
}

$id.addEventListener('focusout', () => checkValidation($id, $idMsg))
$pw.addEventListener('focusout', () => checkValidation($pw, $pwMsg))
$pwCheck.addEventListener('focusout', () =>
    checkValidation($pwCheck, $pwCheckMsg)
)

// 4. 입력 확인 모달 창
// input focus out 될 때 유효성 검사, 가입하기 버튼을 눌렀을 때 모든 필드의 유효성을 검사
const $submit = document.getElementById('submit')
const $modal = document.getElementById('modal')

const $confirmId = document.getElementById('confirm-id')
const $confirmPw = document.getElementById('confirm-pw')

$submit.addEventListener('click', (event) => {
    // 모든 input의 값이 유효한 상태일 경우 입력한 아이디와 비밀번호를 확인할 수 있는 모달 창 open
    event.preventDefault()
    const isValidForm =
        checkValidation($id, $idMsg) === true &&
        checkValidation($pw, $pwMsg) === true &&
        checkValidation($pwCheck, $pwCheckMsg) === true

    if (isValidForm) {
        $confirmId.innerText = $id.value
        $confirmPw.innerText = $pw.value
        $modal.showModal()
    }
})

// 4-1. "취소하기" 버튼 클릭 시 모달 창이 닫혀야 합니다
const $cancelBtn = document.getElementById('cancel-btn')
$cancelBtn.addEventListener('click', () => {
    $modal.close()
})

//4-2. "가입하기" 버튼 클릭 시 윈도우의 alert 창을 이용해 "가입되었습니다 🥳 " 라는 메시지를 출력해야 합니다.
const $approveBtn = document.getElementById('approve-btn')
$approveBtn.addEventListener('click', () => {
    window.alert('가입되었습니다 🥳')
    $modal.close()
    $id.value = ''
    $pw.value = ''
    $pwCheck.value = ''
})

// 5. 폰트 사이즈 조절 버튼
const $html = document.documentElement

const MAX_FONT_SIZE = 20
const MIN_FONT_SIZE = 12

const $increaseFontBtn = document.getElementById('increase-font-btn')
const $decreaseFontBtn = document.getElementById('decrease-font-btn')

const getHtmlFontSize = () => {
    return parseFloat(window.getComputedStyle($html).fontSize)
}

$increaseFontBtn.addEventListener('click', () => {
    onclickFontSizeControl('increase')
})

$decreaseFontBtn.addEventListener('click', () => {
    onclickFontSizeControl('decrease')
})

const onclickFontSizeControl = (flag) => {
    const fontSize = getHtmlFontSize()
    let newFontSize = flag === 'increase' ? fontSize + 1 : fontSize - 1
    $html.style.fontSize = newFontSize
    // 현재 폰트 사이즈가 20px일 경우 + 버튼 비활성화
    $increaseFontBtn.disabled = newFontSize >= MAX_FONT_SIZE
    // 현재 폰트 사이즈가 12px일 경우 - 버튼 비활성화
    $decreaseFontBtn.disabled = newFontSize <= MIN_FONT_SIZE
}
