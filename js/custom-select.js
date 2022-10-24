const CustomSelect = (t => {
	const s = {
		block: "select",
		hideCallback: !1,
		includeValue: !1,
		keyboard: !0,
		modifier: !1,
		placeholder: !1,
		search: !1,
		showCallback: !1,
		transition: 0
	};
	class i {
		constructor(i, e) {
			this._$select = t(i), this._options = {
				...s,
				..."object" == typeof e ? e : {}
			}, this._activeModifier = `${this._options.block}_active`, this._dropupModifier = `${this._options.block}_dropup`, this._optionSelectedModifier = `${this._options.block}__option_selected`, this._keydown = this._keydown.bind(this), this._dropup = this._dropup.bind(this), this._outside = this._outside.bind(this), this._init()
		}
		reset() {
			this._$dropdown.hide().empty(), this._$value.off("click"), this._fill()
		}
		_init() {
			this._$element = t(`<div class="form__${this._options.block} ${this._options.block}">\n           <button class="${this._options.block}__option ${this._options.block}__option_value" type="button"></button>\n           <div class="${this._options.block}__dropdown" style="display: none;"><div class="${this._options.block}__option-wrap"></div></div>\n         </div>`), this._$select.hide().after(this._$element), this._options.modifier && this._$element.addClass(this._options.modifier), this._$value = this._$element.find(`.${this._options.block}__option_value`), this._$dropdown = this._$element.find(`.${this._options.block}__dropdown`), this._$wrap = this._$element.find(`.${this._options.block}__option-wrap`),this._fill()
		}
		_fill() {
			this._$values = this._$select.find("option"), this._values = [];
			let s = this._options.placeholder;
			t.each(this._$values, (s, i) => {
				const e = t(i).text().trim();
				this._values.push(e)
			}), s && (this._$select.find("[selected]").length ? s = !1 : (this._$value.html(s), this._$select.prop("selectedIndex", -1))), t.each(this._values, (i, e) => {
				const o = this._$values.eq(i).attr("class"),
					n = t(`<button class="${this._options.block}__option" type="button">${e}</button>`),
					h = this._$select.find(":selected");
				this._$values.eq(i).attr("disabled") && n.prop("disabled", !0), !h.length && 0 === i || e === h.text().trim() ? (s || this._$value.text(e).removeClass(this._$value.data("class")).removeData("class").addClass(o).data("class", o), (this._options.includeValue || s) && (n.addClass(o), n.toggleClass(this._optionSelectedModifier, this._$values.eq(i).is("[selected]")), this._$wrap.append(n))) : (n.addClass(o), this._$wrap.append(n))
			}), this._$options = this._$dropdown.find(`.${this._options.block}__option`), this._options.search && this._search(), this._$value.one("click", t => {
				this._show(t)
			}), this._$value.prop("disabled", !this._$options.length), this._$options.on("click", t => {
				this._select(t)
			})
		}
		_show(s) {
			s.preventDefault(), this._dropup(), t(window).on("resize scroll", this._dropup), this._$element.addClass(this._activeModifier), this._$dropdown.slideDown(this._options.transition, () => {
				this._options.search && (this._$input.focus(), this._options.includeValue && this._scroll()), "function" == typeof this._options.showCallback && this._options.showCallback.call(this._$element[0])
			}), setTimeout(() => {
				t(document).on("touchstart click", this._outside)
			}, 0), this._$value.one("click", t => {
				t.preventDefault(), this._hide()
			}), this._options.keyboard && (this._options.index = -1, t(window).on("keydown", this._keydown))
		}
		_hide() {
			this._options.search && (this._$input.val("").blur(), this._$options.show(), this._$wrap.scrollTop(0)), this._$dropdown.slideUp(this._options.transition, () => {
				this._$element.removeClass(this._activeModifier).removeClass(this._dropupModifier), "function" == typeof this._options.hideCallback && this._options.hideCallback.call(this._$element[0]), this._$value.off("click").one("click", t => {
					this._show(t)
				}), t(document).off("touchstart click", this._outside), t(window).off("resize scroll", this._dropup)
			}), this._options.keyboard && (this._$options.blur(), t(window).off("keydown", this._keydown))
		}
		_scroll() {
			t.each(this._$options, (s, i) => {
				const e = t(i);
				if (e.text() === this._$value.text()) {
					const t = e.position().top,
						s = this._$wrap.outerHeight(),
						i = s / 2 - e.outerHeight() / 2;
					return t > i && this._$wrap.scrollTop(t - i), !1
				}
			})
		}
		_select(s) {
			s.preventDefault();
			const i = t(s.currentTarget).text().trim(),
				e = [...this._values];
			if (this._$value.text(i).removeClass(this._$value.data("class")), this._$values.prop("selected", !1), t.each(e, (s, o) => {
					this._options.includeValue || o !== i || e.splice(s, 1), t.each(this._$values, (s, e) => {
						const o = t(e);
						if (o.text().trim() === i) {
							const t = o.attr("class");
							o.prop("selected", !0), this._$value.addClass(t).data("class", t)
						}
					})
				}), this._hide(), this._options.includeValue) this._$options.removeClass(this._optionSelectedModifier), t.each(this._$options, (s, e) => {
				const o = t(e);
				if (o.text().trim() === i) return o.addClass(this._optionSelectedModifier), !1
			});
			else {
				if (this._$options.length > e.length) {
					const t = this._$options.eq(e.length);
					t.remove(), this._$options = this._$options.not(t), this._$options.length || this._$value.prop("disabled", !0)
				}
				t.each(this._$options, (s, i) => {
					const o = t(i);
					o.text(e[s]), o.attr("class", `${this._options.block}__option`), t.each(this._$values, function () {
						const i = t(this);
						i.text().trim() === e[s] && (o.addClass(i.attr("class")), o.prop("disabled", i.prop("disabled")))
					})
				})
			}
			void 0 !== s.originalEvent && this._$select.trigger("change")
		}
		_search() {
			this._$input = t(`<input class="${this._options.block}__input" autocomplete="off">`), this._$dropdown.prepend(this._$input), this._$wrap = this._$element.find(`.${this._options.block}__option-wrap`), this._$input.on("focus", () => {
				this._options.index = -1
			}), this._$input.on("keyup", () => {
				const s = this._$input.val().trim();
				s.length ? (this._$wrap.scrollTop(0), setTimeout(() => {
					s === this._$input.val().trim() && t.each(this._$options, (i, e) => {
						const o = t(e),
							n = o.text().trim().toLowerCase(),
							h = -1 !== n.indexOf(s.toLowerCase());
						o.toggle(h)
					})
				}, 300)) : this._$options.show()
			})
		}
		_dropup() {
			const s = this._$element[0].getBoundingClientRect().bottom,
				i = t(window).height() - s < this._$dropdown.height();
			this._$element.toggleClass(this._dropupModifier, i)
		}
		_outside(s) {
			const i = t(s.target);
			i.parents().is(this._$element) || i.is(this._$element) || this._hide()
		}
		_keydown(t) {
			const s = this._$options.filter(":visible").not("[disabled]");
			switch (t.which) {
				case 40:
					t.preventDefault();
					const i = s.eq(this._options.index + 1).length;
					i ? this._options.index += 1 : this._options.index = 0, s.eq(this._options.index).focus();
					break;
				case 38:
					t.preventDefault();
					const e = s.eq(this._options.index - 1).length;
					e && this._options.index - 1 >= 0 ? this._options.index -= 1 : this._options.index = s.length - 1, s.eq(this._options.index).focus();
					break;
				case 13:
				case 32:
					if (!this._$input || !this._$input.is(":focus")) {
						t.preventDefault();
						const s = this._$options.add(this._$value).filter(":focus");
						s.trigger("click"), s.is(this._$value) || this._$select.trigger("change"), this._$value.focus()
					}
					break;
				case 27:
					t.preventDefault(), this._hide(), this._$value.focus()
			}
		}
		static _jQueryPlugin(s) {
			return this.each(function () {
				const e = t(this);
				let o = e.data("custom-select");
				o ? "reset" === s && o.reset() : "string" != typeof s && (o = new i(this, s), e.data("custom-select", o))
			})
		}
	}
	return t.fn.customSelect = i._jQueryPlugin, t.fn.customSelect.noConflict = (() => t.fn.customSelect), i
})($);