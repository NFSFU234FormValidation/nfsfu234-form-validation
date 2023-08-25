            function loadFunctionDetails(item)
            {

                item.addEventListener('click', ()=>{
                    const functionName = item.getAttribute('functionName');
                    const functionDescription = item.getAttribute('functionDescription');
                    const howToCallFunction = item.getAttribute('howToCall');
                    const isFunctionConsolesupported = item.getAttribute('isFunctionConsolesupported');
                    const isFunctionBrowserSupported = item.getAttribute('isFunctionBrowserSupported');

                    if ( document.querySelector(".container .left").classList.contains('active') )
                    {
                        document.querySelector(".container .left").classList.remove('active')
                    }

                    loadFunctionDetailsPage(functionName, functionDescription, howToCallFunction, isFunctionConsolesupported, isFunctionBrowserSupported);

                });

            }

            function loadFunctionDetailsPage(functionName, functionDescription, howToCallFunction, isFunctionConsolesupported, isFunctionBrowserSupported)
            {

                const functionDetailsHeading = document.createElement('div');
                    functionDetailsHeading.classList.add('heading');

                    const title = document.createElement('div');
                        title.classList.add('title');
                        title.innerHTML = `<div class="name">
                            <span class="js-name"></span>.<span class="functionName js-functionName">${ functionName }</span> 
                        </div>

                        

                        <div class="supported">
                            <small><span>Browser Supported? <span class="js-isBrowser"><mark>${ (isFunctionBrowserSupported === '✅') ? 'Yes' : 'No' }</mark></span> </span></small>
                            <small><span>Console Supported? <span class="js-isConsole"><mark>${( isFunctionConsolesupported === '✅') ? 'Yes' : 'No' }</mark></span></span></small>
                        </div>`;


                    const close = document.createElement('div');
                        close.classList.add('close');
                        close.innerHTML = "X";

                    functionDetailsHeading.appendChild(title);
                    functionDetailsHeading.appendChild(close);

                const functionDetailsBody = document.createElement('div');
                    functionDetailsBody.classList.add('body');
                    
                    functionDetailsBody.innerHTML = `<div class="details functionDescription js-functionDescription">${functionDescription}</div>

                        <div class="code">

                            <div class="title">code preview</div>

                            <div class="code-preview">
                                <div class="clipboard">
                                    <div class="clipboard-button">
                                        copy to clipboard 
                                        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-clipboard' viewBox='0 0 16 16'><path d='M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z'/><path d='M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z'/></svg>
                                    </div>
                                </div>
                                <textarea readonly>${howToCallFunction}</textarea>
                            </div>

                        </div>`;

                const functionDetailsFooter = document.createElement('div');
                    functionDetailsFooter.classList.add('footer');
                    functionDetailsFooter.innerHTML = `&copy; 2023. <span class="js-author"></span>`;

            const functionDetails = document.createElement('div');
                functionDetails.classList.add('function-details');

                functionDetails.appendChild(functionDetailsHeading);
                functionDetails.appendChild(functionDetailsBody);
                // functionDetails.appendChild(functionDetailsFooter);

                if ( document.querySelector('.right .function-details') )
                {
                    document.querySelector('.right .function-details').remove();
                }

                document.querySelector('.right').appendChild(functionDetails);

                functionDetails.querySelector('.close').addEventListener('click', ()=>{
                    functionDetails.remove();
                });

                functionDetails.querySelector('.clipboard-button').addEventListener('click', ()=>{
                    
                    

                    if ( copyToClipboard())
                    {

                        functionDetails.querySelector('.clipboard-button').innerHTML = `Copied to clipboard successfully <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-clipboard-check' viewBox='0 0 16 16'><path fill-rule='evenodd' d='M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z'/><path d='M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z'/><path d='M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z'/></svg>`;
                        functionDetails.querySelector('.clipboard-button').classList.add('success');

                        setTimeout(() => {
                            functionDetails.querySelector('.clipboard-button').classList.remove('success');
                            functionDetails.querySelector('.clipboard-button').innerHTML = `copy to clipboard <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-clipboard' viewBox='0 0 16 16'><path d='M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z'/><path d='M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z'/></svg>`;
                        }, 3000);


                    }

                });

            }

            document.addEventListener('DOMContentLoaded', ()=>{

                document.querySelector('.responsiveMenu').addEventListener('click', ()=>{

                    document.querySelector('.container .left').classList.toggle('active');

                });              

            });

            function copyToClipboard() {
                
                // Create a temporary textarea element
                // const textarea = document.createElement('textarea');
                const textarea = document.querySelector('.container .right textarea');
                
                // Set the value of the textarea to the text you want to copy
                textarea.value = textarea.innerHTML;
                // console.log(textarea.innerText);

                console.log(textarea.value);
                
                // Select the text inside the textarea
                textarea.select();
                
                // Copy the selected text to the clipboard
                document.execCommand('copy');



                return true;
        
            }



