package com.entoss.pomfret.actnow.daas.typehandlers;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

public class JsonElementTypeHandler extends BaseTypeHandler<JsonElement> {

	@Override
	public void setNonNullParameter(PreparedStatement ps, int i, JsonElement jsonElement, JdbcType jdbcType)
			throws SQLException {
		ps.setObject(i, jsonElement, jdbcType.TYPE_CODE);
	}

	@Override
	public JsonElement getNullableResult(ResultSet rs, String columnName) throws SQLException {
		/*return (JsonElement) rs.getObject(columnName);*/
		String jsonSource = rs.getString(columnName);
        if (jsonSource != null) {
            return fromString(jsonSource);
        }
        return null;
	}

	@Override
	public JsonElement getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
		/*return (JsonElement) rs.getObject(columnIndex);*/
		String jsonSource = rs.getString(columnIndex);
        if (jsonSource != null) {
            return fromString(jsonSource);
        }
        return null;
	}

	@Override
	public JsonElement getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
		return (JsonElement) cs.getObject(columnIndex);
	}
	
	private JsonElement fromString(String source) {
    	return source == null ? null : new JsonParser().parse(source);
    }
	
}