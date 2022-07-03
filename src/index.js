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

// 2-1 input focus out 될 때 유효성 검사, 가입하기 버튼을 눌렀을 때 모든 필드의 유효성을 검사
const $submit = document.getElementById('submit')
$submit.addEventListener('click', (event) => {
    event.preventDefault()
    checkValidation($id, $idMsg)
    checkValidation($pw, $pwMsg)
    checkValidation($pwCheck, $pwCheckMsg)
})

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
