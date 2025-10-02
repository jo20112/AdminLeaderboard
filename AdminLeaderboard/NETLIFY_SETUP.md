# 🚀 دليل النشر على Netlify

## ⚠️ المشكلة: الموقع يشتغل لكن مش متصل بـ Supabase

إذا كان الموقع بعد النشر على Netlify بيشتغل عادي، لكن تسجيل الدخول والاتصال بقاعدة البيانات مش شغال، المشكلة في أسماء متغيرات البيئة.

### السبب

في **Vite** (اللي المشروع مبني عليه)، متغيرات البيئة اللي بتستخدم في الـ client-side code **لازم** تبدأ بـ `VITE_` عشان تكون متاحة في الكود.

### ❌ الخطأ الشائع

إضافة المتغيرات في Netlify بالشكل ده:
```
SUPABASE_URL=https://ajfoxeejixeucwnhwuxu.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
```

### ✅ الحل الصحيح

## الخطوات المطلوبة

### 1. إعداد Environment Variables في Netlify

اذهب إلى: **Netlify Dashboard** → **Site settings** → **Environment variables**

أضف المتغيرات التالية **بالضبط** كما هو موضح (مع البادئة `VITE_`):

#### المتغيرات المطلوبة:

1. **VITE_SUPABASE_URL**
   ```
   https://ajfoxeejixeucwnhwuxu.supabase.co
   ```

2. **VITE_SUPABASE_ANON_KEY**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqZm94ZWVqaXhldWN3bmh3dXh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzMTM5OTksImV4cCI6MjA3NDg4OTk5OX0.JeHU-sIkQFxdKieAYy9Vs7eOh6i6gQ51snavcl4tpCU
   ```

**ملاحظات مهمة:**
- ✅ تأكد من البدء بـ `VITE_` (حروف كبيرة)
- ✅ اختر **Scope**: Builds ✓
- ✅ اختر **Deploy Context**: Production (أو All)

### 2. إعدادات Build في Netlify

```
Build command: npm run build
Publish directory: dist/public
Node version: 20
```

### 3. بعد إضافة المتغيرات

1. احذف المتغيرات القديمة (إذا كنت أضفت `SUPABASE_URL` و `SUPABASE_ANON_KEY` بدون `VITE_`)
2. اضغط **Trigger deploy** لإعادة النشر
3. انتظر حتى يكتمل الـ build
4. اختبر تسجيل الدخول في الموقع المنشور

---

## 🔧 استكشاف الأخطاء

### المشكلة: لا يزال الاتصال بـ Supabase لا يعمل

**الحل:**
1. تحقق من أن أسماء المتغيرات **بالضبط** كما هو مذكور أعلاه (مع `VITE_`)
2. تأكد من أن الـ Scope يشمل **Builds**
3. تحقق من Build Logs في Netlify للتأكد من عدم وجود أخطاء
4. تأكد من أن الـ Deploy Context يشمل Production

### المشكلة: Build يفشل

**الحل:**
1. تحقق من أن `Build command` هو: `npm run build`
2. تأكد من أن `Publish directory` هو: `dist/public`
3. راجع Build Logs للتفاصيل

---

## ℹ️ لماذا البادئة `VITE_` مطلوبة؟

في Vite، المتغيرات بدون `VITE_` **لا تكون متاحة** في الكود الذي يعمل في المتصفح (client-side). هذا لأسباب أمنية - لمنع تسريب متغيرات حساسة للمستخدمين.

فقط المتغيرات التي تبدأ بـ `VITE_` يتم تضمينها في الـ bundle النهائي.

---

## 📋 Checklist قبل النشر

- ✅ إضافة `VITE_SUPABASE_URL` في Netlify Environment Variables
- ✅ إضافة `VITE_SUPABASE_ANON_KEY` في Netlify Environment Variables
- ✅ التأكد من Scope = Builds
- ✅ التأكد من Deploy Context = Production
- ✅ حذف أي متغيرات قديمة بدون `VITE_`
- ✅ إعادة النشر (Trigger deploy)
- ✅ اختبار تسجيل الدخول في الموقع المنشور

---

## 🎯 بعد النشر الناجح

الآن يجب أن:
- ✅ يفتح الموقع بدون مشاكل
- ✅ تسجيل الدخول يعمل بشكل صحيح
- ✅ الاتصال بـ Supabase يعمل
- ✅ جميع الوظائف تعمل كما في النسخة المحلية

---

## 🆘 الدعم

إذا واجهت مشكلة بعد تطبيق الخطوات:
1. تحقق من Build Logs في Netlify
2. تحقق من Browser Console في الموقع المنشور
3. تأكد من أن Supabase URL و ANON KEY صحيحين
