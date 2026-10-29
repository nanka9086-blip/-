
/* ==========================================
   ციფრული სივრცე 💜
   Complete Interactive JavaScript
========================================== */

document.addEventListener("DOMContentLoaded", () => {
    // --------------------------------------
    // 1. DARK / LIGHT MODE
    // --------------------------------------

    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;

    function updateThemeButton() {
        if (!themeToggle) return;

        const isDark = body.classList.contains("dark");

        themeToggle.textContent = isDark ? "☀️" : "🌙";
        themeToggle.setAttribute(
            "aria-label",
            isDark ? "ღია რეჟიმის ჩართვა" : "მუქი რეჟიმის ჩართვა"
        );
        themeToggle.title = isDark
            ? "ღია რეჟიმი"
            : "მუქი რეჟიმი";
    }

    // Restore the saved theme, if available.
    try {
        const savedTheme = localStorage.getItem("digitalSpaceTheme");

        if (savedTheme === "dark") {
            body.classList.add("dark");
        } else if (savedTheme === "light") {
            body.classList.remove("dark");
        }
    } catch (error) {
        console.warn("Theme preference could not be loaded.");
    }

    updateThemeButton();

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            body.classList.toggle("dark");

            const theme = body.classList.contains("dark")
                ? "dark"
                : "light";

            try {
                localStorage.setItem("digitalSpaceTheme", theme);
            } catch (error) {
                // The theme still works for the current page.
            }

            updateThemeButton();
        });
    }

    // --------------------------------------
    // 2. MOBILE NAVIGATION
    // --------------------------------------

    const nav = document.getElementById("nav");
    const header = document.querySelector("header");

    let menuButton = document.getElementById("menuToggle");

    // Create the menu button because the HTML
    // originally contains no mobile menu button.
    if (nav && header && !menuButton) {
        menuButton = document.createElement("button");

        menuButton.id = "menuToggle";
        menuButton.type = "button";
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-label", "მენიუს გახსნა");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.title = "მენიუ";

        header.insertBefore(menuButton, nav);
    }

    if (nav && menuButton) {
        function closeMenu() {
            nav.classList.remove("open");
            menuButton.textContent = "☰";
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "მენიუს გახსნა");
        }

        menuButton.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("open");

            menuButton.textContent = isOpen ? "✕" : "☰";
            menuButton.setAttribute("aria-expanded", String(isOpen));
            menuButton.setAttribute(
                "aria-label",
                isOpen ? "მენიუს დახურვა" : "მენიუს გახსნა"
            );
        });

        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 760) {
                closeMenu();
            }
        });
    }

    // Add styling for the generated menu button.
    const menuStyle = document.createElement("style");

    menuStyle.textContent = `
        #menuToggle {
            display: none;
            width: 43px;
            height: 43px;
            border: 1px solid var(--border);
            border-radius: 14px;
            background: var(--surface);
            color: var(--text);
            font-size: 1.2rem;
        }

        @media (max-width: 760px) {
            #menuToggle {
                display: inline-grid;
                place-items: center;
            }
        }
    `;

    document.head.appendChild(menuStyle);

    // --------------------------------------
    // 3. QUIZ
    // --------------------------------------

    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const resultElement = document.getElementById("quizResult");

    const quizQuestions = [
        {
            question: "თუ ვინმე გემუქრება ონლაინ, რა უნდა გააკეთო?",
            answers: [
                "უპასუხო გაბრაზებით",
                "დაარეპორტო და უთხრა სანდო ზრდასრულს",
                "გააზიარო მისი პირადი ინფორმაცია"
            ],
            correct: 1,
            explanation:
                "სწორია! 💜 შეინახე მტკიცებულება, დაბლოკე ან დაარეპორტე ანგარიში და დახმარებისთვის სანდო ზრდასრულს მიმართე."
        },
        {
            question: "რას იზამ, თუ შენი მეგობრის დამცინავ პოსტს ნახავ?",
            answers: [
                "გავაზიარებ, რომ სხვებმაც ნახონ",
                "დავუწერ კიდევ უფრო ცუდ კომენტარს",
                "არ გავაზიარებ და მეგობარს მხარდაჭერას შევთავაზებ"
            ],
            correct: 2,
            explanation:
                "ზუსტად! 💜 ნუ გაავრცელებ დამცინავ მასალას. მეგობარს პირადად დაელაპარაკე და საჭიროების შემთხვევაში დახმარება მოიძიეთ."
        },
        {
            question: "რომელი კომენტარი შეიძლება იყოს კონსტრუქციული კრიტიკა?",
            answers: [
                "შენი ვიდეოს ხმა ცოტა დაბალია",
                "შენ არაფრის გაკეთება არ შეგიძლია",
                "ყველამ უნდა დაგცინოს"
            ],
            correct: 0,
            explanation:
                "სწორია! ⭐ კონკრეტული და პატივისცემით ნათქვამი რჩევა შეიძლება დაგეხმაროს გაუმჯობესებაში."
        },
        {
            question: "უცნობი ადამიანი გთხოვს შენს პაროლს. რას იზამ?",
            answers: [
                "გავუგზავნი, თუ მეგობრულად მელაპარაკება",
                "არ გავუზიარებ და საჭიროების შემთხვევაში დავბლოკავ",
                "გამოვაქვეყნებ ჩემს პროფილზე"
            ],
            correct: 1,
            explanation:
                "სწორია! 🔒 პაროლი პირადია. არავის გაუზიარო და საეჭვო შეტყობინებები დაარეპორტე."
        },
        {
            question: "ვიდეომ ცოტა ნახვა მიიღო. რას ნიშნავს ეს?",
            answers: [
                "ეს იმას ნიშნავს, რომ მე ნიჭიერი არ ვარ",
                "უნდა შევწყვიტო ყველაფერი",
                "ერთი ვიდეო ჩემი შესაძლებლობების საზომი არ არის"
            ],
            correct: 2,
            explanation:
                "ზუსტად! 🌟 ნახვები შეიძლება ბევრ ფაქტორზე იყოს დამოკიდებული. შეგიძლია ისწავლო, სცადო ახალი იდეა და გააგრძელო, თუ თავად გსიამოვნებს."
        }
    ];

    let currentQuestion = 0;
    let quizScore = 0;
    let questionAnswered = false;

    function renderQuestion() {
        if (!questionElement || !optionsElement || !resultElement) return;

        const current = quizQuestions[currentQuestion];

        questionAnswered = false;
        questionElement.textContent =
            `${currentQuestion + 1}/${quizQuestions.length} — ${current.question}`;

        resultElement.textContent = "";
        optionsElement.replaceChildren();

        current.answers.forEach((answer, index) => {
            const button = document.createElement("button");

            button.type = "button";
            button.textContent = answer;

            button.addEventListener("click", () => {
                if (questionAnswered) return;

                questionAnswered = true;

                const correct = index === current.correct;

                if (correct) {
                    quizScore++;
                }

                resultElement.textContent = correct
                    ? `✅ ${current.explanation}`
                    : `💜 სწორი პასუხია: ${current.answers[current.correct]}. ${current.explanation}`;

                resultElement.style.color = correct
                    ? "#26965b"
                    : "var(--primary)";

                optionsElement.querySelectorAll("button").forEach(
                    option => {
                        option.disabled = true;
                        option.style.opacity = "0.8";
                        option.style.cursor = "default";
                    }
                );

                const nextButton = document.createElement("button");

                nextButton.type = "button";
                nextButton.className = "btn";
                nextButton.style.marginTop = "15px";

                nextButton.textContent =
                    currentQuestion === quizQuestions.length - 1
                        ? "შედეგის ნახვა"
                        : "შემდეგი კითხვა →";

                nextButton.addEventListener("click", () => {
                    if (currentQuestion < quizQuestions.length - 1) {
                        currentQuestion++;
                        renderQuestion();
                    } else {
                        showQuizResults();
                    }
                });

                optionsElement.appendChild(nextButton);
            });

            optionsElement.appendChild(button);
        });
    }

    function showQuizResults() {
        questionElement.textContent = "ტესტი დასრულებულია! 🎉";

        optionsElement.replaceChildren();

        const percentage = Math.round(
            (quizScore / quizQuestions.length) * 100
        );

        resultElement.textContent =
            `შენი შედეგი: ${quizScore}/${quizQuestions.length} (${percentage}%). ` +
            (quizScore === quizQuestions.length
                ? "შესანიშნავია! კარგად გესმის ონლაინ უსაფრთხოება. 💜"
                : "კარგი დასაწყისია! გაეცანი უსაფრთხოების რჩევებს და სცადე ხელახლა.");

        const restartButton = document.createElement("button");

        restartButton.type = "button";
        restartButton.className = "btn";
        restartButton.textContent = "თავიდან დაწყება";

        restartButton.addEventListener("click", () => {
            currentQuestion = 0;
            quizScore = 0;
            renderQuestion();
        });

        optionsElement.appendChild(restartButton);
    }

    if (questionElement && optionsElement && resultElement) {
        renderQuestion();
    }

    // --------------------------------------
    // 4. MINI CHATBOT
    // --------------------------------------

    const chatButton = document.getElementById("chatButton");
    const chatBox = document.getElementById("chatBox");
    const closeChat = document.getElementById("closeChat");
    const chatMessages = document.getElementById("chatMessages");
    const userInput = document.getElementById("userInput");
    const sendBtn = document.getElementById("sendBtn");

    if (
        chatButton &&
        chatBox &&
        closeChat &&
        chatMessages &&
        userInput &&
        sendBtn
    ) {
        function openChat() {
            chatBox.classList.add("open");
            chatButton.setAttribute("aria-expanded", "true");
            userInput.focus();
        }

        function hideChat() {
            chatBox.classList.remove("open");
            chatButton.setAttribute("aria-expanded", "false");
        }

        chatButton.setAttribute("aria-controls", "chatBox");
        chatButton.setAttribute("aria-expanded", "false");

        chatButton.addEventListener("click", () => {
            if (chatBox.classList.contains("open")) {
                hideChat();
            } else {
                openChat();
            }
        });

        closeChat.addEventListener("click", hideChat);

        function addChatMessage(message, type) {
            const bubble = document.createElement("div");

            bubble.className = type;
            bubble.textContent = message;

            chatMessages.appendChild(bubble);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function getBotReply(message) {
            const text = message.toLowerCase();

            if (
                text.includes("ბულინგ") ||
                text.includes("მეჩხუბ") ||
                text.includes("მემუქრ") ||
                text.includes("მაწუხ")
            ) {
                return "💜 ბოდიში, თუ ამას განიცდი. ეს მარტო არ უნდა მოაგვარო. შეინახე შეტყობინებები, დაბლოკე ან დაარეპორტე ანგარიში და უთხარი სანდო ზრდასრულს. თუ უშუალო საფრთხეში ხარ, მიმართე ადგილობრივ გადაუდებელ დახმარებას.";
            }

            if (
                text.includes("კომენტ") ||
                text.includes("სიძულვილ") ||
                text.includes("hate") ||
                text.includes("დამცინ")
            ) {
                return "💬 ყველა კომენტარზე პასუხის გაცემა არ გჭირდება. კონსტრუქციული კრიტიკისგან შეგიძლია ისწავლო, ხოლო შეურაცხმყოფელი კომენტარი დამალო, წაშალო, დაარეპორტო ან მისი ავტორი დაბლოკო.";
            }

            if (
                text.includes("პაროლ") ||
                text.includes("უსაფრთხო") ||
                text.includes("privacy") ||
                text.includes("პირად")
            ) {
                return "🔒 გამოიყენე ძლიერი, უნიკალური პაროლი და ჩართე ორფაქტორიანი ავთენტიფიკაცია, თუ შესაძლებელია. არ გააზიარო პაროლები, მისამართი ან სხვა პირადი ინფორმაცია.";
            }

            if (
                text.includes("მოტივ") ||
                text.includes("დემოტივ") ||
                text.includes("ნახვ") ||
                text.includes("ლაიქ")
            ) {
                return "🌟 დაბალი ნახვები ან უარყოფითი კომენტარები შენს ღირებულებას არ განსაზღვრავს. დაისვენე, სცადე ახალი იდეა და შეაფასე საკუთარი პროგრესი დროთა განმავლობაში.";
            }

            if (
                text.includes("აუდიტორ") ||
                text.includes("გამომწერ") ||
                text.includes("ჰეშთეგ") ||
                text.includes("პოპულარ")
            ) {
                return "🎯 აირჩიე თემა, რომელიც გაინტერესებს, შექმენი ხარისხიანი და ორიგინალური კონტენტი, გამოიყენე თემასთან შესაბამისი ჰეშთეგები და ესაუბრე შენს აუდიტორიას პატივისცემით. არ გააზიარო პირადი ინფორმაცია ნახვების მოსაპოვებლად.";
            }

            if (
                text.includes("გამარჯ") ||
                text.includes("hello") ||
                text.includes("hi")
            ) {
                return "გამარჯობა! 💜 მკითხე კიბერბულინგის, ონლაინ უსაფრთხოების, კომენტარების ან კონტენტის შექმნის შესახებ.";
            }

            return "💜 შემიძლია დაგეხმარო ონლაინ უსაფრთხოების, კიბერბულინგის, უარყოფითი კომენტარების, მოტივაციისა და აუდიტორიის პოვნასთან დაკავშირებული ზოგადი რჩევებით. შეგიძლია კითხვა უფრო კონკრეტულად ჩამოაყალიბო. ეს არის წინასწარ მომზადებული პასუხების ბოტი და არა ცოცხალი AI.";
        }

        function sendMessage() {
            const message = userInput.value.trim();

            if (!message) return;

            addChatMessage(message, "user");
            userInput.value = "";

            // This bot uses predefined replies; it does not send
            // messages to a server or an external AI service.
            addChatMessage(getBotReply(message), "bot");
            userInput.focus();
        }

        sendBtn.addEventListener("click", sendMessage);

        userInput.addEventListener("keydown", event => {
            if (event.key === "Enter") {
                sendMessage();
            }

            if (event.key === "Escape") {
                hideChat();
            }
        });
    }

    // --------------------------------------
    // 5. COPYABLE REPLIES
    // --------------------------------------

    async function copyText(text) {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
            } else {
                const textArea = document.createElement("textarea");

                textArea.value = text;
                textArea.style.position = "fixed";
                textArea.style.opacity = "0";
                document.body.appendChild(textArea);

                textArea.select();

                const copied = document.execCommand("copy");
                textArea.remove();

                if (!copied) {
                    throw new Error("Copy was unsuccessful.");
                }
            }

            showNotice("ტექსტი დაკოპირდა! 💜");
        } catch (error) {
            showNotice("კოპირება ვერ მოხერხდა. მონიშნე და დააკოპირე ტექსტი ხელით.");
        }
    }

    function showNotice(message) {
        let notice = document.getElementById("siteNotice");

        if (!notice) {
            notice = document.createElement("div");
            notice.id = "siteNotice";

            Object.assign(notice.style, {
                position: "fixed",
                left: "50%",
                bottom: "25px",
                transform: "translateX(-50%)",
                zIndex: "5000",
                maxWidth: "90vw",
                padding: "13px 20px",
                borderRadius: "14px",
                color: "#ffffff",
                background: "#7654ed",
                boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
                textAlign: "center",
                fontSize: "14px"
            });

            document.body.appendChild(notice);
        }

        notice.textContent = message;
        notice.style.display = "block";

        clearTimeout(notice._hideTimer);

        notice._hideTimer = setTimeout(() => {
            notice.style.display = "none";
        }, 2800);
    }

    // Add reusable sample replies to the page.
    const sampleReplies = [
        {
            title: "პასუხი უხეშ კომენტარზე",
            text: "შეგიძლია არ დამეთანხმო, მაგრამ გთხოვ, პატივისცემით მელაპარაკო."
        },
        {
            title: "პასუხი კონსტრუქციულ კრიტიკაზე",
            text: "მადლობა რჩევისთვის! გავითვალისწინებ და ვეცდები გავაუმჯობესო."
        },
        {
            title: "პასუხი საზღვრის დასაწესებლად",
            text: "ამ საუბარში თავს კომფორტულად არ ვგრძნობ. გთხოვ, შეწყვიტო."
        },
        {
            title: "პასუხი მეგობრის მხარდასაჭერად",
            text: "შენ მარტო არ ხარ. თუ გინდა, ერთად მოვიფიქროთ, როგორ მოვაგვაროთ ეს."
        }
    ];

    function createCopyRepliesSection() {
        const protectSection = document.getElementById("protect");

        if (!protectSection) return;

        const container = document.createElement("div");
        container.className = "copy-replies";

        const heading = document.createElement("h3");
        heading.textContent = "💬 პასუხები, რომელთა დაკოპირებაც შეგიძლია";
        heading.style.marginTop = "35px";
        heading.style.marginBottom = "18px";
        container.appendChild(heading);

        sampleReplies.forEach(reply => {
            const card = document.createElement("div");
            card.className = "card";
            card.style.marginBottom = "14px";

            const title = document.createElement("h3");
            title.textContent = reply.title;

            const paragraph = document.createElement("p");
            paragraph.textContent = reply.text;
            paragraph.style.marginBottom = "15px";

            const button = document.createElement("button");
            button.type = "button";
            button.className = "btn";
            button.textContent = "📋 ტექსტის კოპირება";

            button.addEventListener("click", () => {
                copyText(reply.text);
            });

            card.append(title, paragraph, button);
            container.appendChild(card);
        });

        protectSection.appendChild(container);
    }

    createCopyRepliesSection();

    // --------------------------------------
    // 6. INTERACTIVE SCENARIOS
    // --------------------------------------

    const scenarios = [
        {
            title: "სცენარი 1: უცნობი გწერს შეურაცხმყოფელ შეტყობინებას.",
            choices: [
                {
                    text: "ვუპასუხებ შეურაცხყოფით.",
                    good: false,
                    feedback: "შეურაცხყოფამ შეიძლება სიტუაცია გაამწვავოს. ჯობია შეინახო მტკიცებულება, დაბლოკო და დაარეპორტო ანგარიში."
                },
                {
                    text: "შევინახავ მტკიცებულებას და საჭიროების შემთხვევაში დავბლოკავ.",
                    good: true,
                    feedback: "კარგი არჩევანია! 💜 შეინახე მტკიცებულება, გამოიყენე პლატფორმის დაცვის ფუნქციები და საჭიროების შემთხვევაში მიმართე სანდო ზრდასრულს."
                },
                {
                    text: "გავუზიარებ ყველას ჩემს პაროლს დახმარების მისაღებად.",
                    good: false,
                    feedback: "პაროლი პირადია. არასდროს გააზიარო იგი — დახმარებისთვის მიმართე სანდო ზრდასრულს ან პლატფორმის მხარდაჭერას."
                }
            ]
        },
        {
            title: "სცენარი 2: შენი ვიდეოს ქვეშ წერენ, რომ ხმა ძალიან დაბალია.",
            choices: [
                {
                    text: "განვიხილავ, შეიძლება თუ არა ხმის გაუმჯობესება.",
                    good: true,
                    feedback: "სწორია! ⭐ კონკრეტული რჩევა შეიძლება სასარგებლო იყოს, თუ შენც საჭიროდ მიიჩნევ მის გათვალისწინებას."
                },
                {
                    text: "დავიჯერებ, რომ საერთოდ არ მაქვს ნიჭი.",
                    good: false,
                    feedback: "ერთი შენიშვნა შენს შესაძლებლობებს არ განსაზღვრავს. შეგიძლია რჩევა გაითვალისწინო და გააგრძელო სწავლა."
                },
                {
                    text: "ყველას ვეტყვი, რომ ცუდი ადამიანია.",
                    good: false,
                    feedback: "შეგიძლია მშვიდად უპასუხო ან საერთოდ არ უპასუხო. ყველა განსხვავებული აზრი ბულინგი არ არის."
                }
            ]
        },
        {
            title: "სცენარი 3: მეგობარს ჯგუფურ ჩატში დასცინიან.",
            choices: [
                {
                    text: "არ გავაზიარებ დამცინავ მასალას და მეგობარს მხარს დავუჭერ.",
                    good: true,
                    feedback: "ძალიან კარგი! 💜 მხარდაჭერა მნიშვნელოვანია. თუ შევიწროება გრძელდება, შეინახეთ მტკიცებულება და მიმართეთ სანდო ზრდასრულს."
                },
                {
                    text: "დავამატებ კიდევ ერთ დამცინავ კომენტარს.",
                    good: false,
                    feedback: "ამან შეიძლება მეგობარს უფრო ატკინოს. ნუ გააძლიერებ ბულინგს — მხარდაჭერა შესთავაზე."
                },
                {
                    text: "გავავრცელებ ჩატის სქრინშოტს ყველგან.",
                    good: false,
                    feedback: "პირადი მიმოწერის გავრცელებამ შეიძლება სიტუაცია გააუარესოს. მტკიცებულება უსაფრთხოდ შეინახე და აჩვენე მხოლოდ იმ ადამიანს, ვისაც დახმარება შეუძლია."
                }
            ]
        }
    ];

    function createScenarioSection() {
        const aboutSection = document.getElementById("examples");

        if (!aboutSection) return;

        const section = document.createElement("div");
        section.className = "scenario-section";
        section.style.marginTop = "55px";

        const heading = document.createElement("h2");
        heading.textContent = "🧠 რას გააკეთებდი შენ?";
        section.appendChild(heading);

        const intro = document.createElement("p");
        intro.textContent = "აირჩიე პასუხი თითოეულ სიტუაციაში და გაიგე, რატომ შეიძლება იყოს ის სასარგებლო.";
        intro.style.textAlign = "center";
        intro.style.color = "var(--muted)";
        section.appendChild(intro);

        const scenarioContainer = document.createElement("div");
        scenarioContainer.className = "card";
        scenarioContainer.style.maxWidth = "760px";
        scenarioContainer.style.margin = "25px auto";

        const title = document.createElement("h3");
        const choicesContainer = document.createElement("div");
        const feedback = document.createElement("p");

        feedback.setAttribute("aria-live", "polite");
        feedback.style.marginTop = "18px";

        const progress = document.createElement("p");
        progress.style.color = "var(--muted)";
        progress.style.marginBottom = "12px";

        let scenarioIndex = 0;

        function renderScenario() {
            const scenario = scenarios[scenarioIndex];

            progress.textContent =
                `სიტუაცია ${scenarioIndex + 1} / ${scenarios.length}`;

            title.textContent = scenario.title;
            choicesContainer.replaceChildren();
            feedback.textContent = "";

            scenario.choices.forEach(choice => {
                const button = document.createElement("button");

                button.type = "button";
                button.textContent = choice.text;
                button.style.display = "block";
                button.style.width = "100%";
                button.style.textAlign = "left";
                button.style.padding = "14px";
                button.style.marginTop = "10px";
                button.style.borderRadius = "12px";
                button.style.border = "1px solid var(--border)";
                button.style.background = "var(--surface-2)";
                button.style.color = "var(--text)";
                button.style.cursor = "pointer";

                button.addEventListener("click", () => {
                    feedback.textContent =
                        (choice.good ? "✅ " : "💡 ") + choice.feedback;

                    feedback.style.color = choice.good
                        ? "#26965b"
                        : "var(--primary)";

                    choicesContainer.querySelectorAll("button").forEach(
                        item => {
                            item.disabled = true;
                            item.style.opacity = "0.75";
                        }
                    );

                    const next = document.createElement("button");

                    next.type = "button";
                    next.className = "btn";
                    next.style.marginTop = "18px";
                    next.textContent =
                        scenarioIndex === scenarios.length - 1
                            ? "თავიდან დაწყება"
                            : "შემდეგი სიტუაცია →";

                    next.addEventListener("click", () => {
                        scenarioIndex =
                            scenarioIndex === scenarios.length - 1
                                ? 0
                                : scenarioIndex + 1;

                        renderScenario();
                    });

                    choicesContainer.appendChild(next);
                });

                choicesContainer.appendChild(button);
            });
        }

        scenarioContainer.append(
            progress,
            title,
            choicesContainer,
            feedback
        );

        section.appendChild(scenarioContainer);
        aboutSection.appendChild(section);

        renderScenario();
    }

    createScenarioSection();

    // --------------------------------------
    // 7. CONTENT / POST PLANNER
    // --------------------------------------

    function createPostPlanner() {
        const audienceSection = document.getElementById("audience");

        if (!audienceSection) return;

        const planner = document.createElement("div");
        planner.className = "card";
        planner.style.maxWidth = "760px";
        planner.style.margin = "40px auto 0";

        const heading = document.createElement("h3");
        heading.textContent = "🗓️ შენი კონტენტის დამგეგმავი";

        const description = document.createElement("p");
        description.textContent =
            "შექმენი მარტივი გეგმა შენი შემდეგი პოსტისთვის. ეს გეგმა მხოლოდ ამ გვერდზე იქმნება.";

        description.style.color = "var(--muted)";
        description.style.marginBottom = "20px";

        const form = document.createElement("form");
        form.style.display = "grid";
        form.style.gap = "14px";

        function createField(labelText, type, placeholder, options) {
            const wrapper = document.createElement("label");

            wrapper.textContent = labelText;
            wrapper.style.display = "grid";
            wrapper.style.gap = "6px";
            wrapper.style.fontWeight = "600";

            let input;

            if (type === "select") {
                input = document.createElement("select");

                options.forEach(optionText => {
                    const option = document.createElement("option");
                    option.value = optionText;
                    option.textContent = optionText;
                    input.appendChild(option);
                });
            } else if (type === "textarea") {
                input = document.createElement("textarea");
                input.rows = 3;
                input.maxLength = 500;
                input.placeholder = placeholder;
            } else {
                input = document.createElement("input");
                input.type = type;
                input.placeholder = placeholder || "";
            }

            input.style.width = "100%";
            input.style.padding = "12px";
            input.style.border = "1px solid var(--border)";
            input.style.borderRadius = "12px";
            input.style.background = "var(--bg)";
            input.style.color = "var(--text)";
            input.style.font = "inherit";

            wrapper.appendChild(input);

            return { wrapper, input };
        }

        const topic = createField(
            "პოსტის თემა",
            "text",
            "მაგალითად: ჩემი საყვარელი თამაშები"
        );

        const platform = createField(
            "პლატფორმა",
            "select",
            "",
            ["YouTube", "TikTok", "Instagram", "Facebook", "სხვა"]
        );

        const format = createField(
            "კონტენტის ტიპი",
            "select",
            "",
            ["ვიდეო", "ფოტო", "საგანმანათლებლო პოსტი", "ისტორია", "სხვა"]
        );

        const caption = createField(
            "აღწერა ან მთავარი იდეა",
            "textarea",
            "რა გინდა, რომ აუდიტორიამ გაიგოს?"
        );

        const hashtags = createField(
            "ჰეშთეგები (არასავალდებულო)",
            "text",
            "#ჩემიინტერესები #კრეატიულობა"
        );

        const submit = document.createElement("button");
        submit.type = "submit";
        submit.className = "btn";
        submit.textContent = "გეგმის შექმნა ✨";

        const output = document.createElement("div");
        output.setAttribute("aria-live", "polite");
        output.style.marginTop = "20px";

        form.append(
            topic.wrapper,
            platform.wrapper,
            format.wrapper,
            caption.wrapper,
            hashtags.wrapper,
            submit
        );

        form.addEventListener("submit", event => {
            event.preventDefault();

            if (!topic.input.value.trim()) {
                topic.input.focus();
                showNotice("ჯერ მიუთითე პოსტის თემა.");
                return;
            }

            const plan = [
                "📋 ჩემი პოსტის გეგმა",
                "",
                `თემა: ${topic.input.value.trim()}`,
                `პლატფორმა: ${platform.input.value}`,
                `ტიპი: ${format.input.value}`,
                `იდეა: ${caption.input.value.trim() || "ჯერ დასაგეგმია"}`,
                `ჰეშთეგები: ${hashtags.input.value.trim() || "ჯერ არ დამატებულა"}`,
                "",
                "🔒 უსაფრთხოების შეხსენება: არ გააზიარო პირადი ინფორმაცია."
            ].join("\n");

            output.replaceChildren();

            const result = document.createElement("pre");
            result.textContent = plan;
            result.style.whiteSpace = "pre-wrap";
            result.style.overflowWrap = "anywhere";
            result.style.padding = "18px";
            result.style.background = "var(--surface-2)";
            result.style.borderRadius = "14px";
            result.style.font = "inherit";

            const copyButton = document.createElement("button");
            copyButton.type = "button";
            copyButton.className = "btn";
            copyButton.style.marginTop = "12px";
            copyButton.textContent = "📋 გეგმის კოპირება";

            copyButton.addEventListener("click", () => {
                copyText(plan);
            });

            output.append(result, copyButton);
        });

        planner.append(heading, description, form, output);
        audienceSection.appendChild(planner);
    }

    createPostPlanner();

    // --------------------------------------
    // 8. RESOURCE LINKS OPEN SAFELY
    // --------------------------------------

    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.rel = "noopener noreferrer";
    });

    // --------------------------------------
    // 9. FOOTER YEAR
    // --------------------------------------

    const footer = document.querySelector("footer");

    if (footer && !footer.querySelector(".copyright")) {
        const copyright = document.createElement("p");

        copyright.className = "copyright";
        copyright.textContent =
            `© ${new Date().getFullYear()} ციფრული სივრცე.`;

        copyright.style.fontSize = "0.85rem";
        copyright.style.color = "var(--muted)";
        copyright.style.marginTop = "12px";

        footer.firstElementChild?.appendChild(copyright);
    }

    // --------------------------------------
    // 10. WELCOME MESSAGE
    // --------------------------------------

    console.log(
        "💜 ციფრული სივრცე ჩაიტვირთა! გახსოვდეს: ონლაინ უსაფრთხოება მნიშვნელოვანია."
    );
});
