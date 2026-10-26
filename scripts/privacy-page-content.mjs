/** HTML bodies for /privacy/ and /en/privacy/ (generated pages). */

import { PUBLIC_CONTACT_EMAIL, PUBLIC_CONTACT_MAILTO } from "./site-contact.mjs";

export const privacyBodyZh = `
<p class="privacy-lead"><strong>一句话说明：</strong>这三个应用都是<strong>离线、无账号、无服务器</strong>的工具。默认不收集、不上传你的个人信息。数据只存在你手机本机；只有你主动导出、分享或备份时，文件才会离开手机。</p>
<p><strong>生效日期：</strong>2026-10-13 · <strong>发布者：</strong>Ch Etang（Etai 应用集）</p>
<h3>我们是谁</h3>
<p>Etai 应用集是个人开发者发布的开源 Android 应用集合。官网：<a href="https://etais.dev/">https://etais.dev/</a>。开源代码见 GitHub 上的 C一周通、轻记账、团团记仓库。</p>
<h3>我们处理哪些数据</h3>
<h4>1. 应用内业务数据（只存本机）</h4>
<ul>
  <li><strong>C一周通：</strong>学习进度、错题本、界面语言与主题等偏好</li>
  <li><strong>轻记账：</strong>账本流水、分类、备注、收据图片（若你添加）、界面偏好</li>
  <li><strong>团团记：</strong>团体与成员、事务进度、团费流水、缴费凭证图片（若你添加）、界面偏好</li>
</ul>
<p>这些数据保存在应用的本机存储中，<strong>不会</strong>同步到我们运营的云端（我们没有这类服务器）。</p>
<h4>2. 你主动导出或分享的内容</h4>
<p>当你使用「备份 / 导出 / 复制文案 / 分享」等功能时，会生成 zip、CSV、文本或图片等文件。这些文件只在你选择的保存位置或分享目标中出现。我们不会代你上传。</p>
<h4>3. 我们不收集的内容</h4>
<ul>
  <li>不要求注册或登录</li>
  <li>不收集姓名、手机号、邮箱、身份证等身份信息</li>
  <li>不接入广告 SDK、统计分析 SDK、崩溃上报 SDK（以各版本 AndroidManifest 与依赖为准）</li>
  <li>三个应用<strong>都不会</strong>把账本、学习进度等数据上传到我们的服务器；日常使用<strong>不需要联网</strong>。</li>
</ul>
<h3>安装时系统显示的权限（正式版合并清单）</h3>
<p>下列说明依据各应用当前 Play / 酷安就绪分支的<strong>正式版合并安装清单</strong>（你在安装界面看到的列表）。除特别说明外，不含联网、相机、读取相册等权限。</p>
<ul>
  <li><strong>轻记账：</strong>安装列表<strong>只有</strong>一项与 App 签名绑定的系统内部权限（Android 用来注册应用内组件，对用户不可见、不可拒绝）。<strong>没有</strong>联网、相机或存储类权限。收据照片由你在<strong>系统拍照或选图界面</strong>里主动添加。</li>
  <li><strong>团团记：</strong>与轻记账相同——<strong>只有</strong>那一项签名相关的内部权限，没有联网、相机等。</li>
  <li><strong>C一周通：</strong>除上述内部权限外，还有「<strong>查看网络连接状态</strong>」。它来自内置<strong>视频播放库</strong>，用来判断设备是否联网；<strong>应用本身不会因此上网</strong>，也不会上传你的学习数据。课文与演示视频都在安装包内。</li>
</ul>
<h3>儿童与未成年人</h3>
<p>本应用不面向儿童定向收集信息。因数据默认仅存本机且无账号体系，监护人可直接在设备上管理或卸载应用。</p>
<h3>数据安全与换机</h3>
<ul>
  <li>本机数据的安全主要取决于你的设备锁屏与系统安全设置</li>
  <li>卸载应用通常会删除应用内数据；换机或重装前请先使用应用内备份（如有）</li>
  <li>正式签名版本与测试版 / 旧签名版可能无法互相覆盖安装；强制卸载会丢数据，请先备份</li>
</ul>
<h3>网站访问日志（etais.dev）</h3>
<p>本介绍网站 <strong>etais.dev</strong> 会在服务器侧记录<strong>页面访问日志</strong>（不含图片、脚本、样式等静态资源请求）。日志字段包括：访问时间（UTC）、IP 地址、请求的页面路径与查询串、HTTP 状态、Referer、浏览器 User-Agent、Accept-Language，以及 Cloudflare 提供的<strong>大致地理位置</strong>（国家/地区/城市）与 ASN 等网络信息。日志存储在 <strong>Cloudflare D1</strong> 数据库中，<strong>长期保留</strong>（无自动删除），仅用于<strong>流量统计与滥用防护</strong>，不会出售或与广告商共享。各 Android 应用本身仍不收集、不上传你的业务数据。</p>
<p>网站另使用 Cloudflare Web Analytics 汇总访问趋势（与各 APK 内的数据处理无关）。</p>
<h3>第三方与开源</h3>
<p>从 GitHub Releases、酷安、Google Play 等渠道下载时，该渠道可能有自己的下载与账号政策。应用依赖的开源库按其许可证使用；我们不会借此引入追踪类服务。</p>
<h3>政策变更</h3>
<p>若本政策有实质变更，我们会更新本页的生效日期，并在合理范围内通过官网或应用更新说明提示。</p>
<h3>联系方式</h3>
<p>如有隐私相关问题，请发邮件至 <a href="${PUBLIC_CONTACT_MAILTO}">${PUBLIC_CONTACT_EMAIL}</a>，或访问 <a href="https://etais.dev/">etais.dev</a>；也可在对应 GitHub 仓库的 Discussions / Issues 中反馈。</p>
`;

export const privacyBodyEn = `
<p class="privacy-lead"><strong>In one sentence:</strong> These apps are <strong>offline, account-free, and server-free</strong>. By default we do not collect or upload personal information. Data stays on your device; files leave the phone only when you export, share, or back them up yourself.</p>
<p><strong>Effective date:</strong> 2026-10-13 · <strong>Publisher:</strong> Ch Etang (Etai Apps)</p>
<h3>Who we are</h3>
<p>Etai Apps is a personal developer’s set of open-source Android apps. Website: <a href="https://etais.dev/en/">https://etais.dev/</a>. Source code is on GitHub (c-week, easy-ledger, group-matters).</p>
<h3>What data we process</h3>
<h4>1. In-app data (on-device only)</h4>
<ul>
  <li><strong>C Week:</strong> Learning progress, mistake book, language and theme preferences</li>
  <li><strong>Easy Ledger:</strong> Ledger entries, categories, notes, receipt images (if you add them), UI preferences</li>
  <li><strong>Group Matters:</strong> Groups and members, activity progress, group-fund ledger, payment proof images (if you add them), UI preferences</li>
</ul>
<p>This data is stored in the app’s local storage and is <strong>not</strong> synced to a cloud service we operate.</p>
<h4>2. Content you export or share</h4>
<p>When you use backup, export, copy, or share features, the app may create zip, CSV, text, or image files. Those files appear only where you choose to save or send them. We do not upload them for you.</p>
<h4>3. What we do not collect</h4>
<ul>
  <li>No sign-up or sign-in</li>
  <li>No identity data such as name, phone number, email, or ID numbers for our services</li>
  <li>No ad SDKs, analytics SDKs, or crash-reporting SDKs (as reflected in each release’s manifest and dependencies)</li>
  <li>None of the apps upload your ledger or learning data to our servers; normal use does <strong>not</strong> require a network.</li>
</ul>
<h3>Permissions shown at install (release merged manifest)</h3>
<p>Based on each app’s current release merged manifest (what the system shows when you install). Unless noted, there is no Internet, camera, or storage access permission.</p>
<ul>
  <li><strong>Easy Ledger:</strong> The install list shows <strong>only</strong> one signature-bound internal permission (Android uses it to register in-app components; not something you grant separately). <strong>No</strong> Internet, camera, or storage permissions. Receipt photos are added only when you use the <strong>system camera or photo picker</strong>.</li>
  <li><strong>Group Matters:</strong> Same as Easy Ledger—<strong>only</strong> that internal signature permission, no Internet or camera.</li>
  <li><strong>C Week:</strong> That internal permission plus <strong>“view network connections”</strong> from the built-in <strong>video player library</strong>, so the player can tell whether the device is online. The app <strong>does not go online</strong> or upload your learning data. Lessons and videos ship inside the install package.</li>
</ul>
<h3>Children</h3>
<p>We do not direct these apps at children or collect children’s data for our services. Because data stays on-device with no accounts, a parent or guardian can manage or uninstall the app on the device.</p>
<h3>Security and device changes</h3>
<ul>
  <li>On-device security depends mainly on your lock screen and system settings</li>
  <li>Uninstalling usually deletes app data; back up before reinstalling or switching phones</li>
  <li>Release-signed builds may not overwrite older debug or differently signed builds; uninstalling to fix a signature conflict deletes local data unless you backed up first</li>
</ul>
<h3>Website visit logs (etais.dev)</h3>
<p>The marketing site <strong>etais.dev</strong> records <strong>page visit logs</strong> on the server (not requests for images, scripts, stylesheets, or other static assets). Log fields include: timestamp (UTC), IP address, page path and query string, HTTP status, Referer, browser User-Agent, Accept-Language, and <strong>approximate location</strong> from Cloudflare (country/region/city) plus ASN where available. Logs are stored in a <strong>Cloudflare D1</strong> database, <strong>retained long-term</strong> (no automatic deletion), and used only for <strong>traffic statistics and abuse prevention</strong>—not sold or shared with advertisers. The Android apps themselves still do not collect or upload your in-app data.</p>
<p>The site also uses Cloudflare Web Analytics for aggregated traffic trends (separate from data handling inside the apps).</p>
<h3>Third parties and open source</h3>
<p>Download stores (GitHub Releases, Coolapk, Google Play, etc.) have their own policies separate from how data is handled inside the apps. Open-source libraries are used under their licenses; we do not use them to add tracking services.</p>
<h3>Changes</h3>
<p>If this policy changes in a material way, we will update the effective date on this page and note it in release notes or on the website where practical.</p>
<h3>Contact</h3>
<p>For privacy questions, email <a href="${PUBLIC_CONTACT_MAILTO}">${PUBLIC_CONTACT_EMAIL}</a> or visit <a href="https://etais.dev/en/">etais.dev</a>. You can also use Discussions / Issues on the relevant GitHub repository.</p>
`;
