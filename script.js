// ====================================
// スムーススクロール
// ====================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // ハッシュのみの場合（#contact など）
        if (href !== '#' && href.startsWith('#')) {
            e.preventDefault();

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ====================================
// スクロールアニメーション (Intersection Observer)
// ====================================

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // 一度表示されたら監視を解除（パフォーマンス向上）
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 各セクションにスクロールアニメーションを適用
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    section.classList.add('fade-in-section');
    observer.observe(section);
});

// 特長カードにアニメーション
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// ====================================
// ヘッダーのパララックス効果
// ====================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');

    if (heroSection) {
        // パララックス効果: 背景画像の移動速度を遅くする
        heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
});

// ====================================
// スクロールインジケーターの表示/非表示
// ====================================

const scrollIndicator = document.querySelector('.scroll-indicator');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        if (scrollIndicator) {
            scrollIndicator.style.opacity = '0';
        }
    } else {
        if (scrollIndicator) {
            scrollIndicator.style.opacity = '1';
        }
    }
});

// ====================================
// CTAボタンのホバーエフェクト強化
// ====================================

const ctaButtons = document.querySelectorAll('.cta-button');

ctaButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ====================================
// カウンターアニメーション（オプション）
// ====================================

function animateCounter(element, start, end, duration) {
    let current = start;
    const range = end - start;
    const increment = range / (duration / 16); // 60fps

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// ====================================
// レスポンシブメニュー（必要に応じて追加）
// ====================================

// ハンバーガーメニューが必要な場合はこちらに実装

// ====================================
// ページロード時の処理
// ====================================

window.addEventListener('DOMContentLoaded', () => {
    // ページが完全に読み込まれた後の処理
    console.log('SAVREQ GOLF ランディングページが読み込まれました');

    // ヒーローセクションのフェードイン
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
        }, 100);
    }
});

// ====================================
// パフォーマンス最適化: 画像の遅延読み込み
// ====================================

if ('loading' in HTMLImageElement.prototype) {
    // ブラウザがネイティブの遅延読み込みをサポートしている場合
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src || img.src;
    });
} else {
    // Intersection Observerを使った代替実装
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ====================================
// スクロール位置の保存と復元
// ====================================

// ページを離れる前にスクロール位置を保存
window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('scrollPosition', window.pageYOffset);
});

// ページ読み込み時にスクロール位置を復元
window.addEventListener('load', () => {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
        sessionStorage.removeItem('scrollPosition');
    }
});

// ====================================
// アクセシビリティ: キーボードナビゲーション
// ====================================

// Tabキーでのフォーカス時にアウトラインを表示
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// ====================================
// フォーム送信（必要に応じて実装）
// ====================================

// お問い合わせフォームが実装された場合の処理
const contactForm = document.querySelector('#contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // フォームデータの取得と検証
        const formData = new FormData(contactForm);

        // ここでフォームデータを処理（APIへの送信など）
        console.log('フォームが送信されました');

        // 送信完了メッセージの表示
        alert('お問い合わせありがとうございます。担当者より折り返しご連絡いたします。');

        // フォームのリセット
        contactForm.reset();
    });
}

// ====================================
// デバッグ用: 画面サイズの表示（開発時のみ）
// ====================================

if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.addEventListener('resize', () => {
        console.log(`画面幅: ${window.innerWidth}px`);
    });
}
