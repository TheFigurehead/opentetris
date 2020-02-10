import Init from './Init.js';

document.addEventListener('DOMContentLoaded', function(){

    const runApp = () => {
        const instructions = document.getElementById('instructions');
        if(instructions){
            instructions.classList.remove('active');
        }
        Init.initApp();
    }

    const triggers = document.querySelectorAll('#instructions, #confirm_btn');
    triggers.forEach(
        (trigger) => {
            trigger.addEventListener('click', (event) => {
                event.stopPropagation();
                event.preventDefault();
                runApp();
            }, false);
        }
    );

});
