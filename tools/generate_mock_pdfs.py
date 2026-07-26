#!/usr/bin/env python3
"""Generate mock Copilot knowledge PDFs for Cook & Bake Academy."""

from __future__ import annotations

import html
import re
from datetime import date
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
BROCHURE_DIR = ROOT / "brochures"
OUTPUT_DIR = ROOT / "output" / "pdf"

INK = colors.HexColor("#2A2018")
MUTED = colors.HexColor("#74675B")
BRAND = colors.HexColor("#D2691E")
BRAND_DARK = colors.HexColor("#A8521A")
ACCENT = colors.HexColor("#C9A227")
CREAM = colors.HexColor("#FFFAF4")
PALE = colors.HexColor("#FBEEDD")
LINE = colors.HexColor("#E9D9C6")

styles = getSampleStyleSheet()
styles.add(
    ParagraphStyle(
        name="CoverEyebrow",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=9,
        leading=12,
        textColor=BRAND,
        tracking=1.8,
        alignment=TA_CENTER,
        spaceAfter=10,
    )
)
styles.add(
    ParagraphStyle(
        name="CoverTitle",
        parent=styles["Title"],
        fontName="Helvetica-Bold",
        fontSize=32,
        leading=37,
        textColor=INK,
        alignment=TA_CENTER,
        spaceAfter=14,
    )
)
styles.add(
    ParagraphStyle(
        name="CoverSub",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=12,
        leading=18,
        textColor=MUTED,
        alignment=TA_CENTER,
        spaceAfter=12,
    )
)
styles.add(
    ParagraphStyle(
        name="DocTitle",
        parent=styles["Heading1"],
        fontName="Helvetica-Bold",
        fontSize=23,
        leading=28,
        textColor=INK,
        spaceAfter=8,
    )
)
styles.add(
    ParagraphStyle(
        name="Section",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=13,
        leading=17,
        textColor=BRAND_DARK,
        spaceBefore=10,
        spaceAfter=6,
    )
)
styles.add(
    ParagraphStyle(
        name="BodyWarm",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=9.5,
        leading=14,
        textColor=INK,
        spaceAfter=6,
    )
)
styles.add(
    ParagraphStyle(
        name="SmallWarm",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=8,
        leading=11,
        textColor=MUTED,
    )
)
styles.add(
    ParagraphStyle(
        name="Callout",
        parent=styles["BodyText"],
        fontName="Helvetica-Bold",
        fontSize=10,
        leading=15,
        textColor=BRAND_DARK,
        borderColor=ACCENT,
        borderWidth=1,
        borderPadding=10,
        backColor=PALE,
        spaceBefore=8,
        spaceAfter=10,
    )
)


def safe(value: str) -> str:
    return html.escape(value.strip()).replace("\n", "<br/>")


def draw_page(canvas, doc, short_title: str):
    width, height = A4
    canvas.saveState()
    canvas.setFillColor(BRAND)
    canvas.rect(0, height - 7 * mm, width, 7 * mm, fill=1, stroke=0)
    canvas.setStrokeColor(LINE)
    canvas.line(18 * mm, 15 * mm, width - 18 * mm, 15 * mm)
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(18 * mm, 10 * mm, f"Cook & Bake Academy | {short_title}")
    canvas.drawRightString(width - 18 * mm, 10 * mm, f"Page {doc.page}")
    canvas.restoreState()


def make_doc(path: Path, title: str) -> SimpleDocTemplate:
    return SimpleDocTemplate(
        str(path),
        pagesize=A4,
        title=title,
        author="Cook & Bake Academy",
        subject="Mock knowledge source for Microsoft Copilot Studio",
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=20 * mm,
        bottomMargin=21 * mm,
    )


def cover_story(title: str, subtitle: str, badge: str):
    return [
        Spacer(1, 40 * mm),
        Paragraph("COOK &amp; BAKE ACADEMY", styles["CoverEyebrow"]),
        Paragraph(safe(title), styles["CoverTitle"]),
        Paragraph(safe(subtitle), styles["CoverSub"]),
        Spacer(1, 7 * mm),
        Table(
            [[Paragraph(safe(badge), styles["SmallWarm"])]],
            colWidths=[78 * mm],
            style=TableStyle(
                [
                    ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                    ("BACKGROUND", (0, 0), (-1, -1), PALE),
                    ("BOX", (0, 0), (-1, -1), 0.8, LINE),
                    ("LEFTPADDING", (0, 0), (-1, -1), 12),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                    ("TOPPADDING", (0, 0), (-1, -1), 9),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
                ]
            ),
            hAlign="CENTER",
        ),
        Spacer(1, 57 * mm),
        Paragraph(
            "Mock document for demonstration and agent knowledge testing. "
            "All names, addresses, fees, and policies are fictional.",
            styles["CoverSub"],
        ),
    ]


def build_refund_policy():
    path = OUTPUT_DIR / "cook-bake-academy-refund-policy.pdf"
    doc = make_doc(path, "Cook & Bake Academy Refund, Cancellation and Transfer Policy")
    story = cover_story(
        "Refund, Cancellation and Transfer Policy",
        "Plain-language rules for course bookings, withdrawals, transfers, and academy cancellations.",
        "Policy ID: CBA-REF-2026-01 | Effective: 1 August 2026 | Version: 1.0",
    )
    story += [
        PageBreak(),
        Paragraph("Policy at a glance", styles["DocTitle"]),
        Paragraph(
            "This policy applies to public classes and workshops booked directly with Cook & Bake Academy. "
            "It explains what happens when a learner cancels, requests a transfer, misses a class, or when "
            "the Academy changes or cancels a course.",
            styles["BodyWarm"],
        ),
        Paragraph(
            "Refund amounts are calculated from the published course fee actually paid, after discounts, "
            "and exclude any non-refundable third-party charges clearly disclosed at checkout.",
            styles["Callout"],
        ),
        Paragraph("1. Learner cancellation and refund schedule", styles["Section"]),
        Table(
            [
                [
                    Paragraph("<b>When written notice is received</b>", styles["SmallWarm"]),
                    Paragraph("<b>Refund of course fee paid</b>", styles["SmallWarm"]),
                    Paragraph("<b>Administrative charge</b>", styles["SmallWarm"]),
                ],
                ["14 or more calendar days before class starts", "100%", "None"],
                ["7-13 calendar days before class starts", "75%", "S$30"],
                ["3-6 calendar days before class starts", "50%", "S$30"],
                ["Less than 3 calendar days before class starts", "No refund", "Not applicable"],
                ["After the course has started", "No refund", "Not applicable"],
            ],
            colWidths=[78 * mm, 48 * mm, 42 * mm],
            repeatRows=1,
            style=TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, 0), BRAND_DARK),
                    ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                    ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
                    ("FONTSIZE", (0, 1), (-1, -1), 8),
                    ("LEADING", (0, 1), (-1, -1), 11),
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("GRID", (0, 0), (-1, -1), 0.6, LINE),
                    ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, CREAM]),
                    ("LEFTPADDING", (0, 0), (-1, -1), 6),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                    ("TOPPADDING", (0, 0), (-1, -1), 7),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
                ]
            ),
        ),
        Paragraph("2. How to cancel", styles["Section"]),
        Paragraph(
            "Send a written request to enrol@cookbakeacademy.sg with the learner's full name, booking "
            "reference, course code, intake date, reason for cancellation, and preferred refund method. "
            "The timestamp of the received email determines the applicable refund tier.",
            styles["BodyWarm"],
        ),
        Paragraph("3. Refund processing", styles["Section"]),
        Paragraph(
            "Approved refunds are issued to the original payment method within 10 business days after "
            "approval. Banks and card providers may require additional processing time. Cash refunds are "
            "not issued for card or electronic payments.",
            styles["BodyWarm"],
        ),
        Paragraph("4. Transfers and substitutions", styles["Section"]),
        Paragraph(
            "<b>One intake transfer:</b> A learner may request one transfer to another available intake of "
            "the same course at least 7 calendar days before the original start date. A S$30 transfer fee "
            "applies. The replacement intake must begin within 6 months.",
            styles["BodyWarm"],
        ),
        Paragraph(
            "<b>Substitute learner:</b> A booking may be assigned once to another eligible learner at least "
            "3 calendar days before the course begins, with no fee. The substitute must meet prerequisites.",
            styles["BodyWarm"],
        ),
        PageBreak(),
        Paragraph("Special situations", styles["DocTitle"]),
        Paragraph("5. Medical or compassionate grounds", styles["Section"]),
        Paragraph(
            "For a serious illness, injury, bereavement, or other exceptional event, the Academy may offer "
            "a transfer, credit note, or partial refund outside the standard schedule. Supporting documents "
            "may be requested. Decisions are made case by case and do not create a precedent.",
            styles["BodyWarm"],
        ),
        Paragraph("6. Missed classes and late arrival", styles["Section"]),
        Paragraph(
            "A learner who does not attend, leaves early, or arrives too late to participate safely is not "
            "entitled to a refund or replacement session. Where space and teaching resources permit, the "
            "Academy may offer a make-up session at its discretion and may charge for ingredients.",
            styles["BodyWarm"],
        ),
        Paragraph("7. Academy cancellation or material change", styles["Section"]),
        Paragraph(
            "If the Academy cancels an entire course, the learner may choose a full refund or a transfer to "
            "another available intake with no transfer fee. If a class is rescheduled, the Academy will offer "
            "a reasonable replacement date. If the learner cannot attend that date, the unused portion will "
            "be refunded.",
            styles["BodyWarm"],
        ),
        Paragraph(
            "The Academy is not responsible for indirect costs such as transport, accommodation, lost wages, "
            "or third-party purchases.",
            styles["Callout"],
        ),
        Paragraph("8. Promotional bookings, vouchers, and credits", styles["Section"]),
        Paragraph(
            "Refunds for discounted bookings are based on the amount paid. Gift vouchers are not redeemable "
            "for cash, but may be transferred to another person before redemption. Credit notes expire 6 "
            "months after issue and cannot be extended unless required by law.",
            styles["BodyWarm"],
        ),
        Paragraph("9. Ingredient kits and digital materials", styles["Section"]),
        Paragraph(
            "The value of ingredient kits, printed materials, or digital resources already collected, shipped, "
            "downloaded, or accessed may be deducted from an otherwise eligible refund. Unopened physical kits "
            "returned in saleable condition within 7 days are not deducted.",
            styles["BodyWarm"],
        ),
        Paragraph("10. Example calculations", styles["Section"]),
        Table(
            [
                ["Example", "Calculation", "Refund"],
                ["S$680 fee; cancel 16 days before", "100% of S$680", "S$680"],
                ["S$680 fee; cancel 10 days before", "75% of S$680 minus S$30", "S$480"],
                ["S$420 fee; cancel 4 days before", "50% of S$420 minus S$30", "S$180"],
                ["S$220 fee; cancel 1 day before", "No refund", "S$0"],
            ],
            colWidths=[58 * mm, 72 * mm, 38 * mm],
            style=TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, 0), BRAND_DARK),
                    ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                    ("GRID", (0, 0), (-1, -1), 0.6, LINE),
                    ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, CREAM]),
                    ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                    ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
                    ("FONTSIZE", (0, 0), (-1, -1), 8),
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 6),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                    ("TOPPADDING", (0, 0), (-1, -1), 6),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                ]
            ),
        ),
        Paragraph("11. Contact and review", styles["Section"]),
        Paragraph(
            "Questions or disputes should be sent to enrol@cookbakeacademy.sg or +65 6888 1234. "
            "The Academy will acknowledge a written complaint within 2 business days and aims to provide a "
            "written outcome within 7 business days. This mock policy does not limit rights that cannot be "
            "excluded under applicable Singapore consumer law.",
            styles["BodyWarm"],
        ),
        Spacer(1, 6 * mm),
        Paragraph(
            f"Document owner: Student Services | Last reviewed: {date.today().strftime('%d %B %Y')}",
            styles["SmallWarm"],
        ),
    ]
    doc.build(story, onFirstPage=lambda c, d: draw_page(c, d, "Refund Policy"), onLaterPages=lambda c, d: draw_page(c, d, "Refund Policy"))
    return path


SECTION_RE = re.compile(r"^-{8,}\s*$")


def parse_brochure(path: Path):
    lines = path.read_text(encoding="utf-8").splitlines()
    title = next((line.strip() for line in lines if line.strip() and not line.startswith("=")), path.stem)
    course_code = re.search(r"Course Code\s*:\s*(.+)", "\n".join(lines))
    category = re.search(r"Category\s*:\s*(.+)", "\n".join(lines))
    level = re.search(r"Skill Level\s*:\s*(.+)", "\n".join(lines))
    return {
        "path": path,
        "title": title.title().replace("Bbq", "BBQ"),
        "code": course_code.group(1).strip() if course_code else "",
        "category": category.group(1).strip() if category else "",
        "level": level.group(1).strip() if level else "",
        "lines": lines,
    }


def brochure_flowables(item):
    lines = item["lines"]
    out = [
        Paragraph(f"{safe(item['code'])} | {safe(item['category'])}", styles["CoverEyebrow"]),
        Paragraph(safe(item["title"]), styles["DocTitle"]),
        Table(
            [[f"Level: {item['level']}", "Maximum 12 students", "Certificate of Completion"]],
            colWidths=[55 * mm, 55 * mm, 58 * mm],
            style=TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), PALE),
                    ("TEXTCOLOR", (0, 0), (-1, -1), BRAND_DARK),
                    ("FONTNAME", (0, 0), (-1, -1), "Helvetica-Bold"),
                    ("FONTSIZE", (0, 0), (-1, -1), 8),
                    ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                    ("BOX", (0, 0), (-1, -1), 0.8, LINE),
                    ("TOPPADDING", (0, 0), (-1, -1), 7),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
                ]
            ),
        ),
        Spacer(1, 3 * mm),
    ]

    skip_preamble = True
    paragraph_buffer = []

    def flush():
        if paragraph_buffer:
            text = " ".join(paragraph_buffer).strip()
            if text:
                out.append(Paragraph(safe(text), styles["BodyWarm"]))
            paragraph_buffer.clear()

    for raw in lines:
        line = raw.strip()
        if skip_preamble:
            if line == "COURSE SUMMARY":
                skip_preamble = False
                out.append(Paragraph("Course summary", styles["Section"]))
            continue
        if not line or SECTION_RE.match(line):
            flush()
            continue
        if line.startswith("Website") or line.startswith("Note") or line.startswith("(Fees are"):
            flush()
            continue
        if line.isupper() and len(line) < 45:
            flush()
            out.append(Paragraph(safe(line.title()), styles["Section"]))
            continue
        if line.startswith("-"):
            flush()
            out.append(Paragraph(f"- {safe(line.lstrip('- ').strip())}", styles["BodyWarm"]))
            continue
        if re.match(r"^[A-Za-z][A-Za-z ]{2,18}\s*:", line):
            flush()
            label, value = line.split(":", 1)
            out.append(
                Paragraph(f"<b>{safe(label)}:</b> {safe(value)}", styles["BodyWarm"])
            )
            continue
        if line.startswith("(") and line.endswith(")"):
            flush()
            out.append(Paragraph(safe(line), styles["SmallWarm"]))
            continue
        paragraph_buffer.append(line)
    flush()
    return out


def build_course_brochures():
    path = OUTPUT_DIR / "cook-bake-academy-course-brochures.pdf"
    doc = make_doc(path, "Cook & Bake Academy Course Brochures")
    brochures = [parse_brochure(p) for p in sorted(BROCHURE_DIR.glob("*.txt"))]
    story = cover_story(
        "Course Brochures",
        f"A combined catalogue of {len(brochures)} hands-on bakery and culinary programmes.",
        "Bakery courses BAK-101 to BAK-110 | Cooking courses CUL-201 to CUL-210",
    )
    story += [
        PageBreak(),
        Paragraph("Course directory", styles["DocTitle"]),
        Paragraph(
            "Use the course code or title when asking the Course Assistant about fees, duration, "
            "location, level, learning outcomes, or enrolment.",
            styles["BodyWarm"],
        ),
    ]
    directory = [["Code", "Course", "Category", "Level"]]
    directory.extend([[b["code"], b["title"], b["category"], b["level"]] for b in brochures])
    story.append(
        Table(
            directory,
            colWidths=[24 * mm, 88 * mm, 28 * mm, 28 * mm],
            repeatRows=1,
            style=TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, 0), BRAND_DARK),
                    ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                    ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                    ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
                    ("FONTSIZE", (0, 0), (-1, -1), 7.4),
                    ("LEADING", (0, 0), (-1, -1), 9.5),
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("GRID", (0, 0), (-1, -1), 0.5, LINE),
                    ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, CREAM]),
                    ("LEFTPADDING", (0, 0), (-1, -1), 5),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                    ("TOPPADDING", (0, 0), (-1, -1), 5),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                ]
            ),
        )
    )
    for brochure in brochures:
        story.append(PageBreak())
        story.extend(brochure_flowables(brochure))
    doc.build(
        story,
        onFirstPage=lambda c, d: draw_page(c, d, "Course Brochures"),
        onLaterPages=lambda c, d: draw_page(c, d, "Course Brochures"),
    )
    return path


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    refund = build_refund_policy()
    courses = build_course_brochures()
    print(refund)
    print(courses)


if __name__ == "__main__":
    main()
