package nextstep.subway.servlet;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import javax.servlet.ReadListener;
import javax.servlet.ServletInputStream;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import org.apache.commons.io.IOUtil;
import org.apache.commons.lang3.StringUtils;

public class ReadableRequestWrapper extends HttpServletRequestWrapper {

    private final Charset encoding;
    private byte[] rawData;

    public ReadableRequestWrapper(
        HttpServletRequest request) throws IOException {
        super(request);
        String characterEncoding = request.getCharacterEncoding();
        if (StringUtils.isBlank(characterEncoding)) {
            characterEncoding = StandardCharsets.UTF_8.name();
        }
        this.encoding = Charset.forName(
            characterEncoding); // Convert InputStream data to byte array and store it to this wrapper instance.
        try {
            InputStream inputStream = request.getInputStream();
            this.rawData = IOUtil.toByteArray(inputStream);
        } catch (IOException e) {
            throw e;
        }
    }

    @Override
    public ServletInputStream getInputStream() {
        final ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(this.rawData);
        ServletInputStream servletInputStream = new ServletInputStream() {
            @Override
            public boolean isFinished() {
                return false;
            }

            @Override
            public boolean isReady() {
                return false;
            }

            @Override
            public void setReadListener(
                ReadListener readListener) {
            }

            public int read() {
                return byteArrayInputStream.read();
            }
        };
        return servletInputStream;
    }

    @Override
    public BufferedReader getReader() throws IOException {
        return new BufferedReader(new InputStreamReader(this.getInputStream(), this.encoding));
    }

    @Override
    public ServletRequest getRequest() {
        return super.getRequest();
    }


}
