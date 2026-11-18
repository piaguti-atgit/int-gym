import { describe, expect, test, beforeEach } from "vitest";
import { Member } from "../Member.ts";
import { MemberList } from "../MemberList.ts";

describe("MemberList", () => {
  let list: MemberList;
  let member: Member;

  beforeEach(() => {
    list = new MemberList();
    member = new Member({
      name: "Ana Pérez",
      documentId: "12345678",
      plan: "full",
      monthlyFee: 1500,
    });
  });

  test("Create an empty member list", () => {
    expect(list.getItems()).toEqual([]);
  });

  test("add a member", () => {
    list.add(member);
    expect(list.getItems()).toEqual([member]);
  });

  test("reject a duplicated document id", () => {
    list.add(member);
    expect(() => list.add(member)).toThrow();
  });

  test("total fees", () => {
    list.add(member);
    expect(list.totalFees()).toBe(1500);
  });

  test("total with discount applied", () => {
    list.add(member);
    expect(list.totalDiscounted()).toBe(1500);
  });

  test("total with discount applied", () => {
    list.add(member);
    member.discount = 100;
    expect(list.totalDiscounted()).toBe(0);
  });

  test("reject new fee for nonexistent member", () => {
    expect(() => list.updateFee(member.documentId, 1200)).toThrow("Ese miembro no existe.");
  });

  test("update fee for member", () => {
    list.add(member);
    list.updateFee(member.documentId, 1200);
    expect(member.monthlyFee).toBe(1200);
  });

});
