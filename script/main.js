$(document).ready(function() {


    var explainTl = new TimelineMax();
    var androidTl = new TimelineMax();
    var appleTl = new TimelineMax();
    var endTl = new TimelineMax();
    var ajaxPath = "https://bosse-dev.de/studium/mindshare/assets/icons/";
    new Image().src = ajaxPath + 'like.png';
    new Image().src = ajaxPath + 'vr_services.png';
    new Image().src = ajaxPath + 'input.png';
    new Image().src = ajaxPath + 'color.png';
    new Image().src = ajaxPath + 'plakat.png';


    $('#intro_overlay').find('.intro___button').one('touchstart', function() {

        // button scale
        TweenMax.to($('.intro___button'), .225, { scale: 0.85 }, "buttondown");
    });

    $('#intro_overlay').find('.intro___button').one('touchend', function() {

        var tl = new TimelineMax({});
        // button scale
        tl.to($('.intro___button'), .225, { scale: 1 }, "buttonup")

        // slide out
        .to($('#intro_overlay'), 0.325, { x: '-=100%', ease: Power1.easeOut }, "swipe1")

        // set show
        .set($('#chat_topbar,  #chat_overlay'), { autoAlpha: 1 }, "swipe1")

        // slide in
        .to($('#chat_topbar'), 0.325, { x: '-=100%', ease: Power1.easeOut }, "swipe1")
            .to($('#chat_overlay'), 0.325, { x: '-=100%', ease: Power1.easeOut }, "swipe1")
            .call(mindlyIsTyping)
            .call(startExplainTimeline, [], this, "+=1");

    });


    $('.chat___writebar_send_button').one('touchstart', function() {

        TweenMax.to($('.chat___writebar_send_button'), .225, { scale: 0.80 });

    });

    $('.chat___writebar_send_button').one('touchend', function() {

        // switch from menu points to question mark
        var tl = new TimelineMax({});
        tl
            .to($('.chat___writebar_send_button'), .225, { scale: 1 }, "chatbuttonup")
            .set($('#comment_overlay'), { autoAlpha: 1 })
            .to($('#comment_overlay'), 0.325, { x: '-100%', ease: Power1.easeOut }, "slideChat")
            .to($('#chat_overlay'), 0.325, { x: '-=100%', ease: Power1.easeOut }, "slideChat")
            .to($('#chat_topbar').find('img'), 0.125, { autoAlpha: 0, display: 'none', ease: Power1.easeOut })
            .to($('#chat_topbar').find('.menu_question'), 0.125, { display: 'block', autoAlpha: 1, ease: Power1.easeOut }, "+=0.325");

        mindlyIsOnline();

        explainTl.pause();
        androidTl.pause();
        appleTl.pause();
        endTl.pause();
    });

    // comment area

    $('.comment__button').on('touchstart', function() {

        var tl = new TimelineMax({});
        tl.to($('.comment__button'), 0.225, { scale: 0.9 })
            .to($('.comment__button'), 0.125, { scale: 1 });

    });

    $('#circle_blau').on('touchstart', function() {

        var gradient_topbar = $('#chat_topbar').attr('class').split(' ')[1];
        var gradient_clicked = $(this).attr('class').split(' ')[1];
        var gradient_button = $('#send_button_circle').attr('class').split(' ')[1];

        // button scale
        var tl = new TimelineMax({});

        // button scale
        tl.to($('#circle_blau'), .225, { scale: 0.9 }, "buttondownlila");
        tl.to($('#circle_blau'), .225, { border: '2px solid white' }, "buttonuplila")
        tl.to($('#circle_blau2, #circle_blau3'), .225, { border: '0px solid white' }, "buttonuplila")
        tl.to($('#circle_blau'), .225, { scale: 1 }, "buttonuplila")

        TweenMax.set($('#chat_topbar'), { className: "-=" + gradient_topbar });
        TweenMax.set($('#chat_topbar'), { className: "+=" + gradient_clicked });

        TweenMax.set($('#send_button_circle'), { className: "-=" + gradient_button });
        TweenMax.set($('#send_button_circle'), { className: "+=" + gradient_clicked });
    });

    $('#circle_blau2').on('touchstart', function() {

        var gradient_topbar = $('#chat_topbar').attr('class').split(' ')[1];
        var gradient_clicked = $(this).attr('class').split(' ')[1];
        var gradient_button = $('#send_button_circle').attr('class').split(' ')[1];

        // button scale
        var tl = new TimelineMax({});
        // button scale
        tl.to($('#circle_blau2'), .225, { scale: 0.9 }, "buttondownlila");
        tl.to($('#circle_blau2'), .225, { border: '2px solid white' }, "buttonuplila")
        tl.to($("#circle_blau, #circle_blau3"), .225, { border: '0px solid white' }, "buttonuplila")
        tl.to($('#circle_blau2'), .225, { scale: 1 }, "buttonuplila")

        TweenMax.set($('#chat_topbar'), { className: "-=" + gradient_topbar });
        TweenMax.set($('#chat_topbar'), { className: "+=" + gradient_clicked });

        TweenMax.set($('#send_button_circle'), { className: "-=" + gradient_button });
        TweenMax.set($('#send_button_circle'), { className: "+=" + gradient_clicked });
    });

    $('#circle_blau3').on('touchstart', function() {

        var gradient_topbar = $('#chat_topbar').attr('class').split(' ')[1];
        var gradient_clicked = $(this).attr('class').split(' ')[1];
        var gradient_button = $('#send_button_circle').attr('class').split(' ')[1];

        // button scale
        var tl = new TimelineMax({});
        // button scale
        tl.to($('#circle_blau3'), .225, { scale: 0.9 }, "buttondownlila");
        tl.to($('#circle_blau3'), .225, { border: '2px solid white' }, "buttonuplila")
        tl.to($('#circle_blau2, #circle_blau'), .225, { border: '0px solid white' }, "buttonuplila")
        tl.to($('#circle_blau3'), .225, { scale: 1 }, "buttonuplila")

        TweenMax.set($('#chat_topbar'), { className: "-=" + gradient_topbar });
        TweenMax.set($('#chat_topbar'), { className: "+=" + gradient_clicked });

        TweenMax.set($('#send_button_circle'), { className: "-=" + gradient_button });
        TweenMax.set($('#send_button_circle'), { className: "+=" + gradient_clicked });
    });



    // chat area

    var contentObject = {
        bubble1: {
            text: "Hi mein Name ist <strong>Mindly</strong> 🙋‍♂️, <br > willkommen bei <strong>MINDSHARE</strong>!",
        },
        bubble2: {
            text: "Hier kannst du in eine <br ><strong>Argumented Reality Welt</strong> eintauchen.<br >Poste deine Meinung in einen virtuellen Raum. <br ><br >Eine kurze Einführung ... 👨‍🏫",
        },
        bubble3: {
            text: "Zu aller erst☝️<br >Besitzt du ein Android Smartphone?<br> <div class='thumb_container'><div id='thumb_up' class='gr_blau mt_shadow_2'><img src='assets/icons/like.png' alt=''></div><div id='thumb_down' class='gr_blau2 mt_shadow_2'><img src='assets/icons/like.png' alt=''></div></div>",
        },
        bubble4: {
            text: "Voll cool!<br >Okay. Dann könnte es sein, dass du<br ><img class='vr_img' src='assets/icons/vr_services.png' alt=''>im <strong>PlayStore</strong> herunterladen musst, um in die WebAR Welt eintauchen zu können.",
        },
        bubble5: {
            text: "Voll cool! Ein iPhone!<br >Dann funktioniert es Out Of The Box.",
        },
        bubble6: {
            text: "<strong>Nun die Erklärung:</strong><br >Zuerst gibst du deine Antwort ein 🖊️...<img class='vr_img' src='assets/icons/input.png' alt=''>...danach kannst du eine Farbe 🎨 für deine Sprechblase wählen...<img class='vr_img' src='assets/icons/color.png' alt=''>",
        },
        bubble7: {
            text: "Schicke anschließend deine Antwort ab.<br >Trete ein paar Schritte zurück.<br ><br >Halte dann deine Kamera auf das Plakat...",
        },
        bubble8: {
            text: "<img class='vr_img' src='assets/icons/plakat.png' alt=''>",
        },
        bubble9: {
            text: "<strong>Los gehts...</strong>",
        }
    }

    function startExplainTimeline() {

        explainTl.call(addBubble, [contentObject.bubble1.text]);
        explainTl.call(mindlyIsOnline);
        explainTl.call(mindlyIsTyping, [], this, "+=1.5");
        explainTl.call(addBubble, [contentObject.bubble2.text], this, "+=2");
        explainTl.call(mindlyIsOnline);
        explainTl.call(mindlyIsTyping, [], this, "+=1.5");
        explainTl.call(addBubble, [contentObject.bubble3.text], this, "+=3.5");
        explainTl.call(mindlyIsOnline);
        explainTl.call(function() {
            $('#thumb_up').one('touchend', function() { androidTimeline(); });
            $('#thumb_down').one('touchend', function() { appleTimeline(); });
        });

    };

    function androidTimeline() {

        $("#thumb_down").unbind("touchend");

        androidTl.call(mindlyIsTyping);
        androidTl.call(addBubble, [contentObject.bubble4.text]);
        androidTl.call(mindlyIsOnline, [], this, "+=1");
        androidTl.call(mindlyIsTyping, [], this, "+=1");
        androidTl.call(endTimeline, [], this, "+=7");
    }

    function appleTimeline() {

        $("#thumb_up").unbind("touchend");

        appleTl.call(mindlyIsTyping);
        appleTl.call(addBubble, [contentObject.bubble5.text]);
        appleTl.call(mindlyIsOnline, [], this, "+=1");
        appleTl.call(mindlyIsTyping, [], this, "+=2");
        appleTl.call(endTimeline, [], this, "+=2");
    }

    function endTimeline() {

        endTl.call(mindlyIsTyping);
        endTl.call(addBubble, [contentObject.bubble6.text]);
        endTl.call(mindlyIsOnline, [], this, "+=1");
        endTl.call(mindlyIsTyping, [], this, "+=2");
        endTl.call(addBubble, [contentObject.bubble7.text], this, "+=6");
        endTl.call(mindlyIsOnline);
        endTl.call(mindlyIsTyping, [], this, "+=2");
        endTl.call(addBubble, [contentObject.bubble8.text], this, "+=6");
        endTl.call(mindlyIsOnline);
        endTl.call(mindlyIsTyping, [], this, "+=1");
        endTl.call(addBubble, [contentObject.bubble9.text], this, "+=2");
        endTl.call(mindlyIsOnline);
        endTl.call(triggerNextStep, [], this, "+=3");
    }

    function triggerNextStep() {
        $('.chat___writebar_send_button').trigger('touchend');
    }

    function addBubble(content) {

        var container = $('.chat__speechbubble_container');
        container.append('<div class="speechbubble_component triangle mt_shadow_1">' + content + '</div>');

        container.animate({
            scrollTop: container.get(0).scrollHeight
        }, 800);

        TweenMax.to($('.speechbubble_component'), 0.625, { left: 0, scale: 1, ease: Back.easeOut.config(1.2) });
        TweenMax.to($('.speechbubble_component'), 0.325, { autoAlpha: 1, ease: Power1.easeOut, delay: 0.125 });
    }

    function mindlyIsTyping() {

        var textContainer = $('.chat__topbar_status');
        var points = ["<span class='point'>.</span>", "<span class='point'> .</span>", "<span class='point'> .</span>"];

        textContainer.text("schreibt ");

        for (var i = 0; i < points.length; i++) {
            textContainer.append(points[i]);
        }

        var typingTl = new TimelineMax({ repeat: -1, repeatDelay: 0.225 });
        typingTl.staggerTo(".point", .2, { opacity: 1, ease: Power1.easeInOut }, .5);
        typingTl.to(".point", 0.325, { opacity: 0 }, "+=0.325");
    }

    function mindlyIsOnline() {

        var textContainer = $('.chat__topbar_status');

        textContainer.empty();
        textContainer.text("online");
    }
});